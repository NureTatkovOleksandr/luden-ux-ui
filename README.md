# Luden UX/UI Design Project

Luden — магазин цифрових ігор. Мета першого релізу — дати покупцеві змогу знайти гру, переглянути її деталі, оплатити замовлення й відкрити покупку в бібліотеці. Команда визначає вимоги, проєктує desktop-інтерфейс і перевіряє основний сценарій та його помилкові стани.

Зріз `0e0b1dd` описує 15 desktop-кадрів 1440 × 900, 33 переходи й три стартові потоки. У Present 2026-11-20 пройдено покупку Cyberpunk 2077 і відтворено втрату контексту кошика та бібліотеки. Ревізія вимог і переходів очікує погодження. [QA](05_qa/Test_Cases.md) · [Decision Log](01_requirements/Decision_Log.md#погодження)

## Робочі матеріали

- [Робоча Figma й джерело QA — `1CKu…`](https://www.figma.com/design/1CKu1SyAbPWcXXN46RHeV2/Luden?node-id=2-52052) · [Бриф](03_figma_prep/05_Figma_Brief_v0.1.md) · [Покриття 33 AC](03_figma_prep/04_Plan_Review.md)
- [Публікація в Figma Community](https://www.figma.com/community/file/1700961790605683605)
- [Кадри та результати візуального огляду](04_design/06_Review_Report.md)
- [Огляд зауважень і рекомендацій](05_qa/Demo_Review_Script.md) · [Журнал рев’ю](05_qa/AI_Interaction_Log.md)
- [Відеозахист Luden на YouTube](https://youtu.be/3DZtVHCVIjE)

![Каталог Luden у Figma](04_design/screenshots/figma/S-02-A_catalog.png)

У зовнішньому аудиті також наведено файл Community з ключем `sMO6g4ZDrDRewKWsBGs43P`. Для відтворення тестів використовуйте `1CKu…`. Відповідність копій за версіями не підтверджено. [Аудит](https://chatgpt.com/share/6afd7dbb-52d4-83ed-a95e-c78f38ae831d)

## Склад команди та розподіл ролей

| Учасник | Роль | Зона відповідальності |
| --- | --- | --- |
| Паламарчук Антон | Frontend | G2–G3 · навігація, каталог і стани інтерфейсу |
| Таісія Сергєєва | UI/UX | G5, F1–F2, P1 · дизайн-бриф, wireframes, переходи та візуальні правки |
| Панковський Тимофій | Frontend/Backend | G4, G6 · рев’ю плану, простежуваність і перевірка наскрізного сценарію |
| Татьков Олександр | Backend | G1, G3 · реєстрація, автентифікація і матриця прав |
| Кисельов Олександр | Backend | G3, QA · замовлення, оплата, бібліотека і перевірка станів |

[Команда та індивідуальні завдання для захисту](TEAM.md)

## Інструкція з перевірки

1. У Figma відкрийте Present і потік «Покупка гри». Натисніть «Увійти», з порожньої бібліотеки перейдіть до магазину.
2. Відкрийте **Cyberpunk 2077 ($24.99)** → «До кошика» → «До оплати» → «Підтвердити». Симуляція відкриває бібліотеку з цією грою.
3. Поверніться в магазин, відкрийте й закрийте деталі та натисніть «Моя бібліотека». Очікуваний S-03-B. Фактичний S-03-A записано в F-T04.
4. У каталозі натисніть на поле пошуку, щоб побачити готовий результат. Натисніть на поле ще раз, щоб відкрити стан без збігів. Для відмови оплати й помилки каталогу виберіть однойменні стартові потоки.
5. Зіставте побачене з [результатами F-T01…F-T07](05_qa/Test_Cases.md#перевірки-figma-у-present). Критерії закриття дефектів наведено в [журналі](05_qa/Defect_Change_Log.md#ревю-figma).

## Структура репозиторію

| Розділ | Артефакти |
| --- | --- |
| `01_requirements/` | [Специфікація Release MVP](01_requirements/00_Product_Baseline.md), [Input Pack і Source Check](01_requirements/01_Input_Pack_v0.1.md), [Decision Log](01_requirements/Decision_Log.md) |
| `02_architecture/` | [Screen Map](02_architecture/02_Screen_Map.md), [Screen Contracts, матриці та Traceability](02_architecture/03_Screen_Contracts.md) |
| `03_figma_prep/` | [Plan Review](03_figma_prep/04_Plan_Review.md), [Figma Brief](03_figma_prep/05_Figma_Brief_v0.1.md) |
| `04_design/` | [Review Report і кадри Figma](04_design/06_Review_Report.md) |
| `05_qa/` | [Журнал рев’ю](05_qa/AI_Interaction_Log.md), [Defect & Change Log](05_qa/Defect_Change_Log.md), [Test Cases](05_qa/Test_Cases.md) |
