//TODO arrays in selectableDates must be dates that are next to each other and it must start with the first date

document.addEventListener("DOMContentLoaded", () => {
  const sheet = document.styleSheets[0];

  const calendars = document.querySelectorAll(".calendar");
  let selectableDates = {
    id1: new Date(2024, 5, 15),
    id2: new Date(2024, 5, 16),
    id3: new Date(2024, 6, 17),
    id4: new Date(2024, 6, 18),
    id5: new Date(2024, 5, 19),
    id6: new Date(2024, 5, 20),
    id7: new Date(2024, 5, 21),
    id8: new Date(2024, 7, 18),
    id9: [new Date(2024, 7, 20), new Date(2024, 7, 21)],
    id10: [new Date(2024, 7, 22), new Date(2024, 7, 23)],
    id11: [new Date(2024, 7, 24), new Date(2024, 7, 27)],
  };
  console.log(selectableDates);
  calendars[0].dataset.selectableDates = JSON.stringify(selectableDates);
  selectableDates = {
    id1: new Date(2024, 5, 17),
    id2: new Date(2024, 5, 25),
    id3: new Date(2024, 8, 17),
    id4: new Date(2024, 6, 18),
    id5: new Date(2025, 5, 19),
  };

  calendars[1].dataset.selectableDates = JSON.stringify(selectableDates);

  const defaultOptions = { month: "long" };
  const defaultFormat = "nl-BE";

  for (let i = 0; i < calendars.length; i++) {
    calendars[i].dataset.date = new Date(); // new Date();
    generateCalendar(
      new Date(calendars[i].dataset.date),
      calendars[i],
      calendars[i].dataset.format,
      calendars[i].dataset.options
    );
    calendars[i].querySelector(".month .next").addEventListener("click", () => {
      let date = new Date(calendars[i].dataset.date);
      calendars[i].dataset.date = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        1
      );
      date = new Date(calendars[i].dataset.date);

      generateCalendar(
        date,
        calendars[i],
        calendars[i].dataset.format,
        calendars[i].dataset.options
      );
    });

    calendars[i]
      .querySelector(".month .previous")
      .addEventListener("click", () => {
        let date = new Date(calendars[i].dataset.date);

        calendars[i].dataset.date = new Date(
          date.getFullYear(),
          date.getMonth() - 1,
          1
        );
        date = new Date(calendars[i].dataset.date);

        generateCalendar(
          date,
          calendars[i],
          calendars[i].dataset.format,
          calendars[i].dataset.options
        );
      });

    calendars[i].querySelector(".year .next").addEventListener("click", () => {
      let date = new Date(calendars[i].dataset.date);

      calendars[i].dataset.date = new Date(
        date.getFullYear() + 1,
        date.getMonth(),
        1
      );
      date = new Date(calendars[i].dataset.date);

      generateCalendar(
        date,
        calendars[i],
        calendars[i].dataset.format,
        calendars[i].dataset.options
      );
    });

    calendars[i]
      .querySelector(".year .previous")
      .addEventListener("click", () => {
        let date = new Date(calendars[i].dataset.date);

        calendars[i].dataset.date = new Date(
          date.getFullYear() - 1,
          date.getMonth(),
          1
        );
        date = new Date(calendars[i].dataset.date);

        generateCalendar(
          date,
          calendars[i],
          calendars[i].dataset.format,
          calendars[i].dataset.options
        );
      });
  }
  // const monthNextButtons = document.querySelectorAll(".month .next");
  // const monthPreviousButtons = document.querySelectorAll(".month .previous");

  // const yearNextButtons = document.querySelectorAll(".year .next");
  // const yearPreviousButtons = document.querySelectorAll(".year .previous");

  //const monthSpan = document.querySelector(".month span");
  //  const yearSpan = document.querySelector(".year span");

  //const calendarBody = document.querySelector(".calendar_body");

  // let date = new Date();

  //array of selectable dates
  // let selectableDates =
  //     {"id1": new Date(2024, 5, 15), "id2": new Date(2024, 5, 16), "id3":  new Date(2024, 6, 17),
  //      "id4": new Date(2024, 6, 18),"id5":  new Date(2024, 5, 19), "id6": new Date(2024, 5, 20),
  //      "id7":  new Date(2024, 5, 21), "id8": new Date(2024,7,18), "id9": [new Date(2024,7,20), new Date(2024,7,21)]};

  //generating calendar
  // generateCalendar(date);
  //adding event listeners
  // for (let i = 0; i < monthNextButtons.length; i++) {
  //     monthNextButtons[i].addEventListener("click", () => {
  //         date.setMonth(date.getMonth() + 1);
  //         generateCalendar(date);
  //     });
  // }
  // for (let i = 0; i < monthPreviousButtons.length; i++) {
  //     monthPreviousButtons[i].addEventListener("click", () => {
  //         date.setMonth(date.getMonth() - 1);
  //         generateCalendar(date);
  //     });
  // }
  // for (let i = 0; i < yearNextButtons.length; i++) {
  //     yearNextButtons[i].addEventListener("click", () => {
  //         date.setFullYear(date.getFullYear() + 1);
  //         generateCalendar(date);
  //     });
  // }
  // for (let i = 0; i < yearPreviousButtons.length; i++) {
  //     yearPreviousButtons[i].addEventListener("click", () => {
  //         date.setFullYear(date.getFullYear() - 1);
  //         generateCalendar(date);
  //     });
  // }
  function generateCalendar(date, calendar, format = null, options = null) {
    if (!format) format = defaultFormat;
    if (!options) options = defaultOptions;
    const month = new Intl.DateTimeFormat(format, options).format(date);
    const year = date.getFullYear();
    let selectableDates = [];
    if (calendar.dataset.selectableDates != null) {
      selectableDates = JSON.parse(calendar.dataset.selectableDates);
      console.log(
        "retrieved data from dataset and assigned to selectableDates"
      );
      console.log(selectableDates);
      for (const [key, value] of Object.entries(selectableDates)) {
        if (Array.isArray(value)) {
          // If value is an array, iterate over its elements
          selectableDates[key] = value.map(
            (dateString) => new Date(dateString)
          );
        } else {
          // Otherwise, convert the single value to a Date
          selectableDates[key] = new Date(value);
        }
      }
    } else {
      selectableDates = [];
    }

    console.log(selectableDates);
    calendar.querySelector(".month span").innerText = month;
    calendar.querySelector(".year span").innerText = year;

    // monthSpan.innerText = month;
    // yearSpan.innerText = year;
    const calendarBody = calendar.querySelector(".calendar_body");
    calendarBody.innerHTML = "";

    const firstDay = new Date(year, date.getMonth(), 1).getDay();
    for (let i = 1; i < firstDay; i++) {
      calendarBody.innerHTML += "<div></div>";
    }

    const daysInMonth = new Date(year, date.getMonth() + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      isDateArray = isDateSelectable(
        new Date(year, date.getMonth(), i),
        selectableDates
      );
      if (isDateArray.isDateInArray) {
        if (Array.isArray(isDateArray.date)) {
          const selectableDate = new Date(year, date.getMonth(), i);
          const timestamps = []; // Convert date to timestamp

          for (let j = 0; j < isDateArray.date.length; j++) {
            timestamps.push(isDateArray.date[j].getTime());
          }
          const key = getKeyOfDateInArray(
            selectableDate,
            selectableDates
          ).toString();
          const dayDifference =
            isDateArray.date[isDateArray.date.length - 1].getDate() -
            isDateArray.date[0].getDate() +
            1;
          console.log(dayDifference);
          //   let buttonsHTML = `<button class="selectable ${i} ${key}" style="grid-column: span ${dayDifference}" onclick='selectDate(${JSON.stringify(
          //     timestamps
          //   )}, this, "${key}")'>`;
          for (
            let j = i;
            j <= isDateArray.date[isDateArray.date.length - 1].getDate();
            j++
          ) {
            calendarBody.innerHTML += `<button class="selectable ${j} ${key}" onclick = "selectDate([${timestamps}], this, '${key}')">${j}</button>`;
            // buttonsHTML += `<div>${j}</div>`;
          }
          //   calendarBody.innerHTML += buttonsHTML + `</button>`;
          i = isDateArray.date[isDateArray.date.length - 1].getDate();
          sheet.insertRule(
            `.${key} + .${key} {border-right: 2px solid transparent}`,
            sheet.cssRules.length
          );
        } else {
          const selectableDate = new Date(year, date.getMonth(), i);
          const timestamp = selectableDate.getTime(); // Convert date to timestamp
          const key = getKeyOfDateInArray(
            selectableDate,
            selectableDates
          ).toString();
          calendarBody.innerHTML += `<button class="selectable ${i} ${key}" onclick = "selectDate(${timestamp}, this, '${key}')">${i}</button>`;
        }
      } else {
        calendarBody.innerHTML += `<div>${i}</div>`;
      }
    }
  }
});

function isDateSelectable(date, array) {
  let selectableDate;
  const stringArray = Object.values(array).flatMap((value) => {
    if (Array.isArray(value)) {
      const strings = Object.values(value).map((date) => date.toDateString());
      if (strings.includes(date.toDateString())) {
        console.log(value);
        isArrayDate = true;
        selectableDate = value;
      }
      return value.map((date) => date.toDateString());
    } else {
      selectableDate = value;
      return value.toDateString();
    }
  });
  return {
    isDateInArray: stringArray.includes(date.toDateString()),
    date: selectableDate,
  };
}

function getKeyOfDateInArray(date, array) {
  return Object.entries(array)
    .filter(([key, val]) =>
      Array.isArray(val)
        ? val.some(
            (dateInArray) => dateInArray.toDateString() === date.toDateString()
          )
        : val.toDateString() === date.toDateString()
    )
    .map(([key, val]) => key);
}
function selectDate(date, object, value) {
  // let selectedDates = [];
  const calendar = object.closest(".calendar");

  //  let selectedDate = new Date();
  //converting date to timestamp
  console.log(calendar);

  if (Array.isArray(date)) {
    document.getElementById("selected-date").innerHTML = "";
    for (let i = 0; i < date.length; i++) {
      const selectedDateFromTimestamp = new Date(date[i]);
      console.log("new selected date: " + selectedDateFromTimestamp);
      if (
        selectedDateFromTimestamp instanceof Date &&
        !isNaN(selectedDateFromTimestamp)
      ) {
        // selectedDates.push(selectedDateFromTimestamp);
        calendar.querySelector(".selected-date").innerHTML +=
          selectedDateFromTimestamp.toDateString() + " ";
      }
    }
  } else {
    const selectedDateFromTimestamp = new Date(date);
    console.log("new selected date: " + selectedDateFromTimestamp);

    if (
      selectedDateFromTimestamp instanceof Date &&
      !isNaN(selectedDateFromTimestamp)
    ) {
      // selectedDate = selectedDateFromTimestamp;
      calendar.querySelector(".selected-date").innerHTML =
        selectedDateFromTimestamp.toDateString();
    }
    // document.getElementById("selected-date").innerHTML = selectedDate.toDateString();
  }

  const selectedDates = [...calendar.querySelectorAll(`.${value}`)];
  console.log(selectedDates);
  //Displaying values in HTML
  for (let i = 0; i < selectedDates.length; i++) {
    const element = selectedDates[i];
    element.classList.toggle("selected");
    console.log(element);
  }
  console.log("value: " + value);
  calendar.querySelector(".value").innerHTML = value;

  // const datesSameArray = document.querySelectorAll("." + value);
  // for (let i = 0; i < datesSameArray.length; i++) {
  //     datesSameArray[i].classList.toggle("selected");
  // }
  // document.getElementById("value").innerHTML = value;

  removeSelectedClassFromAllDates(selectedDates, calendar);
}

function removeSelectedClassFromAllDates(exceptions, calendar) {
  console.log(exceptions);
  const allDates = calendar.querySelectorAll(".selected");
  exceptions = Array.isArray(exceptions) ? exceptions : [exceptions];
  for (let i = 0; i < allDates.length; i++) {
    if (!exceptions.includes(allDates[i])) {
      allDates[i].classList.remove("selected");
    }
  }
}
