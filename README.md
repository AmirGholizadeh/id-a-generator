# About id-generator
id-generator is a low size package created to generate IDs without much effort.
### Installation
using npm : ``` npm install id-a-generator ```
### Usage
first of all import/require it in your code, then use it as following : ``` idGenerator(config) ```
``` config ``` currently has the following options :  
1. ``` length ``` a number value to specify the length of the ID.
2. ``` uppercase ``` needs a boolean value to get the function to use uppercase keyset too.
3. ``` lowercase ``` same as uppercase but is set to true by default. 
4. ``` numbers ``` same.
5. ``` preffix ``` add a string to the beginning of the ID.
6. ``` suffix ``` add a string to the ending of the ID.
### Example
want a 4 length ID using numbers and lowercase keys?
```
const idGenerator = require('id-a-generator);
const id = idGenerator({length:4, lowercase:true, numbers:true});
```
there you go!