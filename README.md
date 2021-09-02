vise async func:
async componentDidMount() {
await Promise.all([
APIManager.fetchBooks().then(this.handleBooks),
APIManager.fetchAuthor().then(this.handleAuthors),
APIManager.fetchShops().then(this.handleShops),
]);
// All fetch calls are done now
console.log(this.state);
}

ILI

async componentDidMount() {
const [books, authors, shops] = await Promise.all([
APIManager.fetchBooks(),
APIManager.fetchAuthor(),
APIManager.fetchShops(),
]);

this.handleBooks(books);
this.handleAuthors(authors);
this.handleShops(shops);
}
