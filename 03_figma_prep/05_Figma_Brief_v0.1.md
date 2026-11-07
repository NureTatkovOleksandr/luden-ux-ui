# Luden desktop wireframe brief

**Draft for Control C.** Create a grayscale, 1440 px desktop design for a digital game storefront. Use one page, editable native layers, descriptive names, and reusable components with Auto Layout. Keep state references and testing annotations outside the product frames.

## Canonical frames

| ID | Required content |
| --- | --- |
| S-01 | Email, password, Sign in, Create account link |
| S-01-R | Email, password, confirm password, Create account |
| S-02-A | Store header, search, cart, game cards with name and price |
| S-02-B | Search input with an unmatched query and the empty results message. Include Clear search if D-04 is approved |
| S-02-C | Product loading error distinct from an empty search |
| M-01 | Game details overlay with title, price, Add to cart and Close |
| M-02 | Cart overlay with line items, quantity, remove, total and Continue to payment. Align the right edge of the primary action with the total and use a 12 px vertical gap when D-05 is approved |
| M-03 | Checkout overlay with total, currency, payment placeholder, Confirm and Cancel |
| S-03-A | Profile, My Library tab with no purchases, and Store link |
| S-03-B | Profile, My Library tab with the purchased sample game, and Store link |

Use **Atlas Drift** at **$24.99** as the main game and **Moon Relay** at **$14.99** as a second card. Repeat the title and price consistently through the catalogue, game details, and cart. Keep the sample order at one item with zero bonus points. Show loading, login error, empty cart with the primary action disabled, and declined payment as separate state references.

## Navigation intent

- S-01 → S-03-A → S-02-A → M-01 → M-02 → M-03 → S-03-B.
- S-02-A → S-02-B for an unmatched query. Clearing that query returns to the sample catalogue.
- Closing a game or cart overlay returns to the catalogue. Cancelling checkout returns to the cart.
- The checkout success link goes to a prepared library frame. A declined payment reference stays at checkout.

Keep the buyer flow free of catalogue editing actions. Document role restrictions in the screen contract and prototype annotations. A real login, payment, licence issue, database change, and server authorization are implementation checks. Google sign-in, password recovery, bonus controls, currency conversion and mobile layouts are outside this wireframe set.

Before handing off, verify the frame IDs, shared data, overlays, disabled checkout, no-results recovery and simulated checkout outcome. Keep the initial editable snapshot separate from the reviewed version.
