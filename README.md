# alphabetizer.js
Output string in alphabetical order with expression tools, simple user interface with index.html  
**View in action at: (Recommend Chrome, firefox doesn't diplay performance.now() correctly)** https://jlingenfelser.github.io/alphabetizer/

# nodeAlphabetizer.js
Node js command line tool version of string alphabetizer.
To run on your computer:
1. Clone repository to local unix filesystem
2. CD to cloned directory (i.e /documents/GitHub/alphabetizer
3. **If node is not installed:** >curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
4. run command >node nodeAlphabetizer ARGV (Argument can be any number of strings seperated by spaces or special characters)





TODO:
- [x] Create simple mixed implementation of native and bubble sort and test speed increase. (loop through characters in input string and if no capital letters are used, used the native sort, otherwise use bubble). 
- [x] Create pivot sort implementation then mixed pivot and native. 
- [x] Write test case that will run each sort algo using strings of various lengths and characters / special / numbers/ capitals and find average time to completion. 
- [x] Implement fastest sort as node command line script.
