/*
Answer for the content part.

Whenever the button is pressed,
a prompt should be produced that prompts
the user for either "Hello" or "Goodbye".
If the user inputs "Hello" into the prompt,
double all of the numbers for the hello list
(and ONLY the hello list)
If the user inputs "Goodbye" into the prompt,
double all of the numbers for the goodbye list
(and ONLY the goodbye list)
This should be accomplished with a single function

Matthew Cooper
17 Feb 2021
 */

$("#thebutton").click(
    function() {
        let input_string = prompt("Enter 'Hello' or 'Goodbye'.");
    if (input_string === "Hello") {
        $(".hello").text(
            function( index, text ) {
                return "Hello Number " + (parseInt(text.replace(/[^0-9\.]/g, '')) * 2)
            });
    }
    else if (input_string === "Goodbye") {
        $(".goodbye").text(
            function( index, text ) {
                return "Goodbye Number " + (parseInt(text.replace(/[^0-9\.]/g, '')) * 2)
            });
    }
    else {
       console.log("Invalid Input");
   }
});

// ================================================================================
/*
Answer for the styles part.

Whenever the button is pressed,
a prompt should be produced that prompts
the user for either "Hello" or "Goodbye".
If the user inputs "Hello" into the prompt,
turn the text for all the hello list green
(and ONLY the hello list) and the good bye
list should change to the default color
If the user inputs "Goodbye" into the prompt,
turn the text for all the goodbye list green
(and ONLY the goodbye list) and the hello list
should change to the default color
This should be accomplished with a single function
This should be done by leveraging the style sheet.

Matthew Cooper
17 Feb 2021
 */

/*$("#thebutton").click(
    function() {
        let input_string = prompt("Enter 'Hello' or 'Goodbye'.");
    if (input_string === "Hello") {
        $(".hello").addClass("highlight");
        $(".goodbye").removeClass("highlight");
    }
    else if (input_string === "Goodbye") {
        $(".hello").removeClass("highlight");
        $(".goodbye").addClass("highlight");
    }
    else {
       console.log("Invalid Input");
   }
});*/