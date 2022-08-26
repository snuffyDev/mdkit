import { IDB } from "$lib/helpers/db";

const db = new IDB("mdkit", "items", 1);

export async function getFolders() {
	let request: IDBRequest;
	db.transaction("readonly", (store) => {
		request = store.getAll();

		return new Promise((res, reject) => {
			request.onsuccess = function () {
				res(this.result);
			};
			request.onerror = function () {
				reject(this.error);
			};
		});
	})?.then(() => request.result);
}
