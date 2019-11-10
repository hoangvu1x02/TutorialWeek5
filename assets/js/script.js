const now = moment().startOf('hour');
const currentHour = now.hour();
$("#currentDate").text(now.format("DD MMM YYYY"));

const fromTime = now.clone().hour(9);
const toTime = now.clone().hour(17);

let planner;
const LOCAL_STORAGE_KEY = 'planner';

const localStoragePlanner = localStorage.getItem(LOCAL_STORAGE_KEY);
if (localStoragePlanner !== null) {
	planner = JSON.parse(localStoragePlanner);
} else {
	planner = {};
}

for (let currentTime = fromTime.clone(); currentTime.isSameOrBefore(toTime); currentTime.add(1, 'h')) {
	const hour = currentTime.hour();

	// Cloning the clone item
	const hourSection = $("#cloneItem").clone();

	// Modify the cloned hour section
	if (hour < currentHour) {
		hourSection.addClass('past');
	}
	if (hour === currentHour) {
		hourSection.addClass('present');
	}
	if (hour > currentHour) {
		hourSection.addClass('future');
	}

	hourSection.removeAttr('id');
	hourSection.data("hour", hour);
	hourSection.find(".hour").text(currentTime.format("hA"));

	if (planner[hour] !== undefined) {
		hourSection.find(".memoContainer").val(planner[hour]);
	}

	// Append it into planner container
	$("#plannerContainer").append(hourSection);
}

$("#clearPlannerButton").click(function() {
	localStorage.removeItem(LOCAL_STORAGE_KEY);
	location.reload();
});

$("#plannerContainer").on("click", ".saveButton", function() {
	const $parent = $(this).parent();

	const hour = $parent.data('hour');
	const userInput = $parent.find(".memoContainer").val();

	planner[hour] = userInput;
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(planner));
});
