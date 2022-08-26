import { browser } from "$app/env";

export type IDBRequestTarget = Event & {
	target: EventTarget & { result: IDBRequest & IDBCursorWithValue };
};

export class IDB {
	private $$: Promise<IDBDatabase> | undefined;
	constructor(private DB_NAME: string, private DB_STORE_NAME: string, private DB_VER: number = 1) {
		if (!browser) return;
	}

	private init(): void {
		if (!browser) return;
		if (this.$$) {
			return;
		}
		this.$$ = new Promise((resolve, reject) => {
			const request = indexedDB.open(this.DB_NAME, this.DB_VER);

			request.onerror = () => reject(request.error);
			request.onsuccess = () => resolve(request.result);

			request.onupgradeneeded = () => {
				request.result.createObjectStore(this.DB_STORE_NAME);
			};
		});
	}

	public transaction<K = unknown, T extends (store: IDBObjectStore) => K = (store: IDBObjectStore) => K>(
		type: IDBTransactionMode,
		callback: T,
	): Promise<K | void> | undefined {
		if (!browser) {
			return undefined;
		}

		this.init();
		return (this.$$ as Promise<IDBDatabase>).then(
			(db) =>
				new Promise<K | void>((resolve, reject) => {
					const tx = db.transaction(this.DB_STORE_NAME, type);
					tx.oncomplete = () => resolve();
					tx.onabort = tx.onerror = () => reject(tx.error);

					callback(tx.objectStore(this.DB_STORE_NAME));
				}),
		);
	}
}
