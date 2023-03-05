// Define an array of objects to represent each hour of the work day
let workDay = [
    { hour: 9, display: "9AM", event: "", },
    { hour: 10, display: "10AM", event: "", },
    { hour: 11, display: "11AM", event: "", },
    { hour: 12, display: "12PM", event: "", },
    { hour: 13, display: "1PM", event: "", },
    { hour: 14, display: "2PM", event: "", },
    { hour: 15, display: "3PM", event: "", },
    { hour: 16, display: "4PM", event: "", },
    { hour: 17, display: "5PM", event: "", }
];

// Function to display the current date and time
function displayCurrentTime() {
    let currentDate = moment().format("dddd, MMMM Do");
    let currentTime = moment().format("HH:mm:ss");
    $("#currentDay").text(`${currentDate} ${currentTime}`);
 }
 setInterval(displayCurrentTime, 1000); // Update current time every second

 // Function to create time blocks
function createTimeBlocks() {
    let currentHour = moment().hour();
    // Loop over each hour of the work day and create a time block
    for (let hour of workDay) {
        let timeBlock = $("<div>").addClass("row time-block");
        let hourEl = $("<div>").addClass("col-md-1 hour").text(hour.display);
        let eventEl = $("<textarea>").addClass("col-md-10 description").val(localStorage.getItem(hour.display));
        let saveBtn = $("<button>").addClass("col-md-1 saveBtn").html("<i class='fas fa-save'></i>");
        // Adds classes to the event column based on whether the hour is in the past, present, or future
        if(hour.hour < currentHour) {
            eventEl.addClass("past");
        }else if(hour.hour === currentHour) {
            eventEl.addClass("present");
        }else{
            eventEl.addClass("future");
        }
        // Appends each time block to the container element
        timeBlock.append(hourEl, eventEl, saveBtn);
        $(".container").append(timeBlock);
    }
}

// Function to change color based on past present and future
function changeColor() {
    let currentHour = moment().hour();
    $(".description").each(function() {
        let blockHour = parseInt($(this).parent().find(".hour").text());
        if(blockHour < currentHour) {
            $(this).addClass("past");
        }else if(blockHour === currentHour) {
            $(this).addClass("present");
        }else{
            $(this).addClass("future");
        }
    });
}

// Call the functions
displayCurrentTime();
createTimeBlocks();
changeColor();