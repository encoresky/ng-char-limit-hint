

# Text character limit hint

## Installation

```
npm i @encoreskytech/ng-char-limit-hint
or
yarn add @encoreskytech/ng-char-limit-hint
```

## Add the tag like that and under that tag, add text area or textbox 
```javascript
<ng-char-limit-hint>
    // include your Textbox or Text are here
</ng-char-limit-hint>
```


## Examples
```
<ng-char-limit-hint [maxCharLimit]="50" [format]="'REMAIN/TOTAL remaining'" [parentClass]="'parent-class'" [hintTextClass]="'child-class'">
    <textarea ></textarea>
</ng-char-limit-hint>
```
### OR

```
<ng-char-limit-hint [maxCharLimit]="50" [format]="'REMAIN/TOTAL remaining'" [parentClass]="'parent-class'" [hintTextClass]="'child-class'">
    <input type="text" />
</ng-char-limit-hint>
```

| Property  | Type `(Default)`| Description |
| ------------------------ | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| maxCharLimit  | number  | Length of string which you want to limit |
| format | string | ClassName for parent REMAIN and TOTAL are constants and values would be replaced if you use those. You can type anything in any order. |
| parentClass | string | If want to change the style of the parent div of the hint box.   |
| hintTextClass | string | If need to change the hint string text style. |

## Contributor
[Mahesh Soni](https://github.com/maheshsoniest)