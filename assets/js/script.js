const today = moment().startOf('hour');
$("#currentDate").text(today.format("DD MMM YYYY"));

const fromTime = today.clone().hour(9);
const toTime = today.clone().hour(17);

console.log('From time: ', fromTime.format());
console.log('To Time: ', toTime.format());

for (let currentTime = fromTime.clone(); currentTime.isSameOrBefore(toTime); currentTime.add(1, 'h')) {
	// Cloning the clone item
	const hourSection = $("#cloneItem").clone();

	// Modify the cloned hour section
	hourSection.removeAttr('id');
	hourSection.data("hour", currentTime.hour());
	hourSection.find(".hour").text(currentTime.format("hA"));

	$("#plannerContainer").append(hourSection);
}
