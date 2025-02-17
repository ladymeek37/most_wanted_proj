/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////
"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            searchResults = searchByTraits(people);
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            break;
        case "family":
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            let personFamily = findPersonFamily(person[0], people);
            
            break;
        case "descendants":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = findPersonDescendants(person[0], people);
            //alert(personDescendants);
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}

function displayFamily(people, type) {
    alert(
        people
            .map(function (person) {
                return `${type}: ${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    personInfo += `Gender: ${person.gender}\n`;
    personInfo += `DOB: ${person.dob}\n`;
    personInfo += `Height: ${person.height}\n`;
    personInfo += `Weight: ${person.weight}\n`;
    personInfo += `Eye Color: ${person.eyeColor}\n`;
    personInfo += `Occupation: ${person.occupation}\n`
    //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
    alert(personInfo);
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁


function findPersonFamily(personObj={}, peopleArr=[]){
    // f. finds person by id (sp)
    let spouse = findById(personObj, peopleArr, "currentSpouse");
    if (spouse.length > 0){
        displayFamily(spouse, "Spouse")
    }else { 
        alert("No spouse found.")
    }

    // f. finds people by id (parent)
    let parents = findParents(personObj, peopleArr);
    if (parents.length > 0){
        displayFamily(parents, "Parents")
    } else {
        alert("No parents found.")
    }
    
    // f. finds people based off parents (siblings)
    let siblings = findSibs(personObj, peopleArr);
    if (siblings.length > 0){
        displayFamily(siblings, "Siblings")
    } else { 
        alert("No siblings found.")
    }
    
    // return collection of people
    return spouse.concat(parents).concat(siblings)
}

function findById(personObj, peopleArr, personPropStr){
    return peopleArr.filter(function(item){
        return (personObj[personPropStr] === item.id)
    })
}

function findParents(personObj, peopleArr){
    return peopleArr.filter(function(item){
        return personObj.parents.includes(item.id)
    })
}

function findSibs(personObj, peopleArr){
    return peopleArr.filter(function(item){
        return personObj.parents.includes(item.parents[0]) || personObj.parents.includes(item.parents[1])
    })
}


function findPersonDescendants(personObj, peopleArr){
    // f. finds children by id
    let children = findChildren(personObj, peopleArr);
    if (children.length > 0){
    displayFamily(children, "Child")        
    }else{
        alert ("No children found.")
    }
    // f. finds grandchildren by id
    let grandChildren = findGrandChildren(children, peopleArr);
}

function findChildren(personObj, peopleArr){
    return peopleArr.filter(function(item){
        return item.parents.includes(personObj.id)
    })
}



function findGrandChildren(personObj, peopleArr){
    const result = [];
    for (let child in personObj){
     let grandChild =  findChildren(personObj[child], peopleArr);
     if (grandChild.length > 0){
        displayFamily(grandChild, "Grandchild")}
     
    }
    
    return result
}



function searchByTraits(peopleArr){
    let traitsNumberSearch = promptFor("Would you like to search by one trait or two?", chars);
        if (traitsNumberSearch === "one") {
            oneTraitSearch(peopleArr);
        }
        if (traitsNumberSearch === "two"){
            multipleTraitSearch(peopleArr);
        }
}

function oneTraitSearch(peopleArr) {
    let userInputProp = promptFor("Please enter what property you would like to search by: (gender, height, weight, eyeColor, occupation)", chars);
    let userInputVal =  promptFor("Please enter a value for your trait seach:", chars);
    let foundItems = peopleArr.filter(function (person){
        try {
            if (person[userInputProp]===(userInputVal)) {
                return true;
            }
            
        } catch (error) {
            console.log(error);
            
        }
        finally {
            if (person[userInputProp]===parseInt(userInputVal)){
                return true;
            }
        }
    });
    displayFamily(foundItems, "Search Results")
    return foundItems;
}

function multipleTraitSearch(peopleArr){
    let userInputProp = promptFor("Please enter what properties you would like to search by: (gender, height, weight, eyeColor, occupation)", chars);
    let propArray = userInputProp.split(" ");
    let userInputVal = promptFor(`Enter the value for ${propArray[0]} trait search:`, chars);
        let foundItems = peopleArr.filter(function (person){
            try {
                if (person[propArray[0]]===(userInputVal)){
                    return true;
                }
            } catch (error) {
                console.log(error);
                
            }
            finally{
                if (person[propArray[0]]===parseInt(userInputVal)){
                    return true;
                }    
            }

            })
                let newUserInputVal = promptFor(`Enter the value for ${propArray[1]} trait search:`, chars);
                let newFoundItems = foundItems.filter(function (person){
                    try {
                        if (person[propArray[1]]===(newUserInputVal)){
                            return true;  
                        }                      
                    } catch (error) {
                        console.log(error);
                        
                    }
                    finally{
                        if (person[propArray[1]]===parseInt(newUserInputVal)){
                            return true;  
                    }

                    }
                })
            displayFamily(newFoundItems, "Search Results")      
            }

