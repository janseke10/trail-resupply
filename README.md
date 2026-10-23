# Trail Resupply · prototype

Phone web app for resupplying in towns on a thru-hike. Fill in kcal per day per category
(breakfast, lunch, dinner, snacks, or your own), days to the next town and what you still carry.
Then scan products in the supermarket: each scan takes its calories off what you still need.

- Barcode scanning: the phone camera (ZXing on iPhone, the built-in detector on Android),
  or search by name (e.g. "snickers"),
  or a photo of the barcode, or type the number.
- Product data: Open Food Facts (free, no account). Not found? Type the label in once;
  the app remembers that barcode from then on, also offline.
- Everything is stored on the phone only (browser storage). No account, no server.
- Works without signal once opened once (service worker), except looking up new products.

Files: `index.html` (the whole app), `sw.js` (offline cache), `manifest.webmanifest` (home-screen app).

The camera only works over https. Live at https://janseke10.github.io/trail-resupply/
double-clicking the file works for typing products in, not for scanning.

