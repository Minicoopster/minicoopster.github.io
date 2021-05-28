/*
Project 3
Matthew Cooper
*/
let tasks = [
  {
    id: 0,
    title: "Doing Laundary",
    dueDate: new Date (2020,1,28),
    completed : false,
    completeDate : null,
    createdDate: new Date (2020,1,23),
    deleted:false,
    note:"I need to get quarters first at Kroger."
  },
  {
    id: 1,
    title: "CS3744 Assignment 3",
    dueDate: new Date (2020,2,17),
    completed : false,
    completeDate : null,
    createdDate: new Date (2020,1,24),
    deleted:false,
    note:"I better start early cuz it looks pretty complicated.\r\nLooks like I have to read w3schools.com a lot."
  },
  {
    id: 2,
    title: "Getting AAA batteries",
    dueDate: null,
    completed : true,
    completeDate : new Date (2020,2,1),
    createdDate: new Date (2020,1,26),
    deleted:false,
    note:"for my remote control."
  },
  {
    id: 3,
    title: "Booking a flight ticket ACM CHI conference",
    dueDate: new Date (2020,3,15),
    completed : false,
    completeDate : null,
    createdDate: new Date (2020,2,26),
    deleted:false,
    note:"I would have to book a flight ticket to ACM CHI conference.\r\nKeep an eye on the cancellation policy. the conference may be cancelled due to the cornoa virus outbreak. :( Although flight tickets are getting cheaper."
  }
];


// Class for the project, per demo example.
(function($, window, document) {

    let filter_overdue_tasks = false;
    let hide_complete = false;

    //main method
    $(function() {
        populate();
        $("#deleteCompletedTasks").prop("disabled", false);
        $("tbody").on('click', [".form-check-input"], [this], complete_task);
        $("tbody").on('click', [".form-check-input"], [this], disable_handler);
        $("#overdue").on('click', [this], filter_overdue);
        $("#hidecompleted").on('click', [this], hide_completed);
        $("tbody").on('click', [".deletetask"], [this], delete_task);
        $("#deleteCompletedTasks").on('click', delete_complete_task);
        $(".addtask").on('click', open_modal_handler);

        $("#myModal button.btn-success").on('click', new_task_object);
        $("#myModal button.close").on('click', close_modal_handler);
        $("#myModal button.btn-danger").on('click', close_modal_handler);
        form = $("#myModal").find(".form-group").on("submit", 
            function(event) {
                event.preventDefault();
            });
    });

    //self explanatory
    function open_modal_handler() {
         $("#myModal").modal('show');
    }

    //self explanatory
    function close_modal_handler() {
         $(".form-control")[0].value = "";
         $(".form-control")[1].value = "";
         $(".form-control")[2].value = "";
         $("#myModal").modal('hide');
    }

    /*
    Helper function to read in tasks in the list
    Essentially a constructor.
    */
    function populate() {        

        $("tbody").empty();
        tbody = $("tbody");
        
        if (!filter_overdue_tasks) {
            if (!hide_complete) {
                for (i = 0; i < tasks.length; i++) {
                    if (!tasks[i].deleted) {
                        tbody.append(new_task(tasks[i]));
                        tbody.append(new_task_note(tasks[i]));
                    }
                }
            }
            else {
                for (i = 0; i < tasks.length; i++) {
                    if (!tasks[i].deleted && !tasks[i].completed) {
                        tbody.append(new_task(tasks[i]));
                        tbody.append(new_task_note(tasks[i]));
                    }
                }
            }
        }
        else {
            for (i = 0; i < tasks.length; i++) {
                if (!tasks[i].deleted && !tasks[i].completed && tasks[i].dueDate < new Date()) {
                    tbody.append(new_task(tasks[i]));
                    tbody.append(new_task_note(tasks[i]));
                }
            }
        }
    }

    /*
    Function to create new task. Will be used for the add
    task form. Takes a task object as a parameter.
    Param : task object
    Returns : nt new task to be rendered in jQuery
    */
    function new_task(task) {
        if (task.completed) {
            nt = $("<tr>", {"id": task.id,
                    "class": "success"});
            nt.append($("<td>", {"class": "text-center"}).append($("<input>", {"type": "checkbox",
                "class": "form-check-input",
                "value": task.id,
                "checked" : task.completed})), 
            [$("<td>", {"class" : "text-center"}).append($("<del>", {text: task.title.length <= 30 ? task.title : task.title.slice(0,30) + "..."})),
            $("<td>", {"class" : "text-center"}).append(note_button(task.id)),
            $("<td>", {"class" : "text-center",
                text: format_date(task.dueDate)}),
            $("<td>", {"class" : "text-center",
                text: format_date(task.completeDate)}),
            $("<td>", {"class" : "text-center"}).append(
                trash_button(task.id)).append(mail_button(task))
            ]);
            return nt;
        }
        else {
            nt = $("<tr>", {"id": task.id,
                    "class": overdue_checker(task.dueDate) ? "":"danger"});
            nt.append($("<td>", {"class": "text-center"}).append($("<input>", {"type": "checkbox",
                "class": "form-check-input",
                "value": task.id,
                "checked" : task.completed})), 
            [$("<td>", {"class" : "text-center",
                text: task.title.length <= 30 ? task.title : task.title.slice(0,30) + "..."}),
            $("<td>", {"class" : "text-center"}).append(note_button(task.id)),
            $("<td>", {"class" : "text-center",
                text: format_date(task.dueDate)}),
            $("<td>", {"class" : "text-center",
                text: format_date(task.completeDate)}),
            $("<td>", {"class" : "text-center"}).append(
                trash_button(task.id)).append(mail_button(task))
            ]);
            return nt;
        }
    }

    /*
    Handling rules for the overdue dates booleans
    I made the executive decision to make the current date
    not overdue.
    Param : Date object due date
    Returns : true if not overdue or null, false otherwise
    */
    function overdue_checker(date) {
        
        if (date === null) {
            return true;
        }
        else {
            hours = date.getHours() + 23;
            mins = date.getMinutes() + 59;
            seconds = date.getSeconds() + 59;
            month = date.getMonth();
            day = date.getDate();
            year = date.getFullYear();

            return new Date(year, month, day, hours, mins, seconds) >= new Date();
        }
    }

    /*
    Function to create a new task note. Supports the
    new_task function.
    Param : task object
    Returns : ntn new task note to be rendered in jQuery
    */
    function new_task_note(task) {
        let ntn = $("<tr>", {"id" : "note-" + task.id,
            "class": "collapse"});

        ntn.append($("<td>")).append(
            $("<td>", {"colspan": 5}).append(
                $("<div>", {"class": "well"}).append(
                    $("<h3>", {text: task.title}),[
                    "<div>" + task.note.replace(/\r\n|\r|\n/, '<br>') + "</div>"])));
        return ntn;
    }

    /*
    Helper function to create the dropdown button.
    Param : task id
    Returns : orange note dropdown button to be rendered in jQuery
    */
    function note_button(id) {
        return $("<span>", {"class": "text-right"}).append(
            $("<button>", {"class": "btn btn-xs btn-warning",
                    "data-toggle": "collapse",
                    "data-target": "#note-"+id,
                    text: "Note"}).prepend(
                    $("<span>", {"class": "glyphicon glyphicon-triangle-bottom"})));
    }

    /*
    Helper function to create the trash button.
    Param : takes task id number
    Returns : trash button to be rendered in jQuery
    */
    function trash_button(id) {
        return $("<button>", {"class": "btn btn-xs btn-danger deletetask",
                    "alt": "Delete the task",
                    "value": id,
                    "type": "button"}).append(
                    $("<span>", {"class": "glyphicon glyphicon-trash"}));
    }

    /*
    Helper function to create the mail button.
    Param : task object
    Returns : mail button to be rendered in jQuery
    */
    function mail_button(task) {
        return $("<a>", {"target": "_blank",
                    "href": "mailto:?subject=" + task.title + "&body=" + task.note}).append(
                    $("<button>", {"class": "btn btn-xs btn-danger emailtask",
                        "alt": "Send and email",
                        "value": task.id,
                        "type": "button"}).append(
                           $("<span>", {"class": "glyphicon glyphicon-envelope"})));
    }

    /*
    Function to handle check mark completion.
    Param : value of the jQuery checked event
    */
    function complete_task(value) {
        t = tasks[(value.target.value)];
        if (t.completed) {
            t.completed = false;
            t.completeDate = null;
            populate();
        }
        else {
            t.completed = true;
            t.completeDate = new Date();
            populate();
        }
    }

    /*
    Function to filter overdue items
    Param : value of the JQuery click event
    */
    function filter_overdue(button) {
        if (!filter_overdue_tasks) {
            filter_overdue_tasks = true;
            id = "#" + button.currentTarget.id;
            $(id).addClass("active");
            populate();
            $("#deleteCompletedTasks").prop("disabled", true);
        }
        else {
            filter_overdue_tasks = false;
            id = "#" + button.currentTarget.id;
            $(id).removeClass("active");
            populate();
            if ($(".form-check-input").filter(':checked').length < 1) {
                $("#deleteCompletedTasks").prop("disabled", true);
            }
            else {
                $("#deleteCompletedTasks").prop("disabled", false);
            }
        }
    }

    /*
    Function to filter complete items
    Param : value of the JQuery click event
    */
    function hide_completed(button) {
        if (!hide_complete) {
            hide_complete = true;
            id = "#" + button.currentTarget.id;
            $(id).addClass("active");
            populate();
            $("#deleteCompletedTasks").prop("disabled", true);
        }
        else {
            hide_complete = false;
            id = "#" + button.currentTarget.id;
            $(id).removeClass("active");
            populate();
            if ($(".form-check-input").filter(':checked').length < 1) {
                $("#deleteCompletedTasks").prop("disabled", true);
            }
            else {
                $("#deleteCompletedTasks").prop("disabled", false);
            }
        }
    }

    /*
    Helper to format the dates based on the spec.
    Param : Date object
    Returns : if null empty string
    Returns : if not null mm/dd/yyyy string 
    */
    function format_date(date) {
        if (date != null) {
            month = ((date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1));
            day = (date.getDate() >= 10 ? date.getDate() : "0" + (date.getDate()));

            return month + '/' + day + '/' + date.getFullYear();
        }
        else {
            return '';
        }
    }

    /*
    Delete a task after asking the user.
    Param : value of the JQuery click event
    */
    function delete_task(value) {
        if (confirm("Are you sure?")) {
            tasks[value.currentTarget.value].deleted = true;
            populate();
        }
        else {
            return 1;
        }
    }

    /*
    Delete many tasks after asking the user.
    */
    function delete_complete_task() {
        checked_list = $(".form-check-input").filter(':checked')
        if (!confirm(checked_list.length === 1? "Are you sure you want to delete " + checked_list.length + " task?" : "Are you sure you want to delete " + checked_list.length + " tasks?"))
            return 1;
        
        for (i = 0; i < checked_list.length; i++) {
            tasks[checked_list[i].value].deleted = true;
        }
        
        populate();
        $("#deleteCompletedTasks").prop("disabled", true);
    }

    /*
    Delete complete disable handler.
    Param : value of the JQuery click event
    */
    function disable_handler(value) {
        if (value.target.checked && !hide_complete) {
            $("#deleteCompletedTasks").prop("disabled", !value.target.checked);
        }
        else {
            if ($(".form-check-input").filter(':checked').length < 1) {
                $("#deleteCompletedTasks").prop("disabled", true);
            }
            else {
                $("#deleteCompletedTasks").prop("disabled", false);
            }
        }
    }

    /*
    Checks for null or empty titles.
    Param : title string
    Returns : true if valid title false otherwise
    */
    function check_title(text) {
        if (text === null || text === "") {
            show_tip("Task needs a title.");
            return false;
        }
        return true;
    }

    /*
    Checks for invalid dates.
    Param : date string
    Returns : true if valid date false otherwise
    */
    function check_date(date) {
        if (date === "") {
            return true;
        }
        else if (Number.isNaN((new Date(date)).getTime())) {
            show_tip("Check your date format.");
            return false;
        }
        else {
            return true;
        }
    }

    /*
    Form tip function
    Param : string to use in the alert
    */
    function show_tip(text) {
        alert(text);
    }

    /*
    Task object constructor. Handles the Add Task functionality.
    */
    function new_task_object() {        

        let valid = false;
        valid = check_title($(".form-control")[0].value) && check_date($(".form-control")[1].value);

        if (valid) {
            nto = {
                id: tasks.length,
                title: $(".form-control")[0].value,
                dueDate: $(".form-control")[1].value === ""? null : new Date($(".form-control")[1].value),
                completed : false,
                completeDate : null,
                createdDate: new Date(),
                deleted:false,
                note: $(".form-control")[2].value
                }
            tasks.push(nto);
            close_modal_handler();
            populate();
        }
    }
}
(window.jQuery, window, document));