# Карта екранів Luden

**G2 · Figma · редакція 2026-11-07.** 15 кадрів 1440 × 900 і 33 переходи ON_CLICK → NAVIGATE. Назви кадрів та адресати звірено з [інвентарем](../04_design/Figma_Prototype_Inventory.json).

| Стартовий потік | Кадр |
| --- | --- |
| Покупка гри | [S-01](https://www.figma.com/design/1CKu1SyAbPWcXXN46RHeV2/Luden?node-id=2-52052) |
| Відмова оплати | [M-03-E](https://www.figma.com/design/1CKu1SyAbPWcXXN46RHeV2/Luden?node-id=2-53156) |
| Помилка каталогу | [S-02-C](https://www.figma.com/design/1CKu1SyAbPWcXXN46RHeV2/Luden?node-id=2-52379) |

## Кадри й переходи

| Кадр | Клік і результат | Експорт |
| --- | --- | --- |
| S-01 Вхід | «Увійти» → S-03-A<br>«Зареєструватися» → S-01-R | [PNG](../04_design/screenshots/figma/S-01_sign_in.png) |
| S-01-R Реєстрація | «Зареєструватися» → S-03-A<br>«Повернутися до входу» → S-01 | [PNG](../04_design/screenshots/figma/S-01-R_register.png) |
| S-03-A Профіль — порожня бібліотека | «Магазин» → S-02-A<br>«Перейти до магазину» → S-02-A | [PNG](../04_design/screenshots/figma/S-03-A_library_empty.png) |
| S-02-A Каталог | Поле пошуку → S-02-R<br>Картка Cyberpunk 2077 → M-01<br>«Моя бібліотека» → S-03-A | [PNG](../04_design/screenshots/figma/S-02-A_catalog.png) |
| S-02-R Результат пошуку | Поле пошуку → S-02-B<br>«Очистити пошук» → S-02-A<br>«Моя бібліотека» → S-03-A<br>Картка Cyberpunk 2077 → M-01 | [PNG](../04_design/screenshots/figma/S-02-R_search_results.png) |
| S-02-B Немає збігів | «Очистити пошук» → S-02-A | [PNG](../04_design/screenshots/figma/S-02-B_search_empty.png) |
| S-02-C Помилка каталогу | «Спробувати ще раз» → S-02-A | [PNG](../04_design/screenshots/figma/S-02-C_catalog_error.png) |
| M-01 Деталі Cyberpunk 2077 | Хрестик → S-02-A<br>«До кошика» → M-02 | [PNG](../04_design/screenshots/figma/M-01_game_details.png) |
| M-02 Кошик | Хрестик → S-02-A<br>Видалити гру → M-02-E<br>«До оплати» → M-03 | [PNG](../04_design/screenshots/figma/M-02_cart.png) |
| M-02-E Кошик — порожній | Хрестик → S-02-A | [PNG](../04_design/screenshots/figma/M-02-E_cart_empty.png) |
| M-03 Оплата | «Скасувати» → M-02<br>«Підтвердити» → S-03-B | [PNG](../04_design/screenshots/figma/M-03_checkout.png) |
| M-03-E Оплата — відмова | «Скасувати» → M-02<br>«Спробувати ще раз» → M-03 | [PNG](../04_design/screenshots/figma/M-03-E_payment_declined.png) |
| S-03-B Профіль — бібліотека після покупки | «Магазин» → S-02-P | [PNG](../04_design/screenshots/figma/S-03-B_library_purchase.png) |
| S-02-P Каталог після покупки | Поле пошуку → S-02-RP<br>«Моя бібліотека» → S-03-B<br>Картка Cyberpunk 2077 → M-01 | [PNG](../04_design/screenshots/figma/S-02-P_catalog_purchased.png) |
| S-02-RP Результат пошуку після покупки | Поле пошуку → S-02-B<br>«Очистити пошук» → S-02-P<br>«Моя бібліотека» → S-03-B<br>Картка Cyberpunk 2077 → M-01 | [PNG](../04_design/screenshots/figma/S-02-RP_search_purchased.png) |

## Основний маршрут

```text
S-01 → S-03-A → S-02-A → M-01 → M-02 → M-03 → S-03-B
S-03-B → S-02-P → S-02-RP → S-03-B
```

Пошук перемикає готові кадри по кліку на поле. Очищення S-02-RP повертає каталог після покупки. Якщо з S-02-RP відкрити стан без збігів, очищення повертає S-02-A. Спільний кадр деталей також закривається в S-02-A. Звідти бібліотека веде до S-03-A, тому стан покупки втрачається. [F-01](../05_qa/Defect_Change_Log.md#ревю-figma)

Гостьовий старт, індикатор завантаження каталогу, помилка входу та стан обробки оплати відсутні. Вимоги й видимі контроли наведено в [контрактах](03_Screen_Contracts.md).
