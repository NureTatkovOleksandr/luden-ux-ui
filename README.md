# Luden UX/UI Design Project

Luden — магазин цифрових ігор. Мета першого релізу — дати покупцеві змогу знайти гру, переглянути її деталі, оформити замовлення й відкрити покупку в бібліотеці. Команда визначає вимоги, проєктує desktop-інтерфейс і перевіряє основний сценарій та його помилкові стани.

## Робочі матеріали

- [Клікабельний desktop-прототип](04_design/Prototype.html). Відкрийте HTML з копії репозиторію у браузері.
- [Кадри та результати візуального огляду](04_design/06_Review_Report.md)
- [Демонстраційний чат рев’ю](05_qa/Demo_Chat.html) · [Повний журнал реплік](05_qa/AI_Interaction_Log.md)
- [План відеозахисту](05_qa/Defense_Guide.md)

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

1. Відкрийте прототип і натисніть «Увійти» з демоданими. З профілю перейдіть до магазину.
2. Знайдіть **Atlas Drift**, відкрийте деталі й додайте гру в кошик. Перейдіть до оплати.
3. Натисніть «Підтвердити». Прототип відкриє бібліотеку з цією грою. Оплата симулюється.
4. У каталозі виберіть жанр, введіть `zz-no-match`, потім очистьте пошук. Жанр має залишитися вибраним.
5. У [протоколі QA](05_qa/Test_Cases.md) зіставте результат прототипу з окремими перевірками застосунку.

## Структура репозиторію

| Розділ | Артефакти |
| --- | --- |
| `01_requirements/` | [Специфікація Release MVP](01_requirements/00_Product_Baseline.md), [Input Pack і Source Check](01_requirements/01_Input_Pack_v0.1.md), [Decision Log](01_requirements/Decision_Log.md) |
| `02_architecture/` | [Screen Map](02_architecture/02_Screen_Map.md), [Screen Contracts, матриці та Traceability](02_architecture/03_Screen_Contracts.md) |
| `03_figma_prep/` | [Plan Review](03_figma_prep/04_Plan_Review.md), [Figma Brief](03_figma_prep/05_Figma_Brief_v0.1.md) |
| `04_design/` | [Прототип](04_design/Prototype.html), [Review Report](04_design/06_Review_Report.md), експортовані кадри |
| `05_qa/` | [AI Interaction Log](05_qa/AI_Interaction_Log.md), [Defect & Change Log](05_qa/Defect_Change_Log.md), [Test Cases](05_qa/Test_Cases.md) |

Методична основа — «Від специфікації до перевіреного UX/UI-макета», §§ 1, 5–19, 21–22 та додатки A–C. [Репозиторій-зразок](https://github.com/NureSaltykovaYuliia/mini-issue-tracker-ux-ui)
