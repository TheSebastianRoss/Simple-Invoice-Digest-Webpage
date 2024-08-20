
# Simple-Invoice-Digest-Webpage
This project was comissioned by a client in order to automate part of their workflow.

The Simple Invoice Digest system will take a list of quantities, items, and prices; these will be summarized into an output that shows the total for each type of item. Some items in the input list may have an additional line for notes, which the system is to disregard as they are not relevant to the count.

View the webpage at the following link:
https://thesebastianross.github.io/Simple-Invoice-Digest-Webpage/

## Usage
### Input Format
Copy the list of items into the input field. Each item should have the following format:
```
(Count)

 (Item Name)

(Price)

```
or
```
(Count)

 (Item Name)

(Price)

(Notes)

```

For example:
```
1

 PEPSI 591ML

$5.65

1

 7UP 591ML

$5.65

```

### Output
For each unique product: the total count, item category, item name, and individual price are displayed in a table.

For example:

| Quantity | Item Type     | Item Name       | Price Each |
| -------- | ------------- | --------------- | ---------- |
| 13       | Beer          | BUD LIGHT 473ML | $11.25     |
| 7        | Non-Alcoholic | PEPSI 591ML     | $5.65      |

