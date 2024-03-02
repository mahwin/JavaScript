import localforage from "localforage";

document.addEventListener("DOMContentLoaded", () => {
  const store = localforage.createInstance({
    name: "myIndexedDB",
  });
  console.log(store);
  const addBtn = document.querySelector(".add");
  const showBtn = document.querySelector(".show");
  const showAllBtn = document.querySelector(".show_all");
  addBtn.addEventListener("click", () => {
    store.setItem("name", "John Doe");
  });
  showBtn.addEventListener("click", async () => {
    const name = await store.getItem("name");
    console.log(name);
  });

  showAllBtn.addEventListener("click", async () => {
    store
      .iterate(function (value, key) {
        console.log([key, value]);
      })
      .then(function () {
        console.log("Iteration has completed");
      })
      .catch(function (err) {
        console.log(err);
      });
  });
});
