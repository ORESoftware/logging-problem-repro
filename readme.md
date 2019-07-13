

# Weird logging problem

# repro 1

```bash
node consumer-1.js | node producer.js

```


# repro 2

```bash
node consumer-2.js | node producer.js
```


### Two questions:

1. why does r keep growing in size? In theory, the size of the file is continually reduced to 2000 bytes each 
time `handleFileExcess` is called.

2. Why are we getting 0x00 / 0000 0000 written to the file? Why these empty bytes?