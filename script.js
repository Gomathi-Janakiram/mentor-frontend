var url = "https://mentor-task6.herokuapp.com/"
function getMentors() {
    fetch(url + "mentors")
        .then((resp) => {
            return resp.json()
        })
        .then((result) => {
            console.log(result.data)
            let details = result.data
            let listBtn = document.getElementById("mentorBtn")
            listBtn.addEventListener('click', () => {
                createRadioBtn(details);
            })
        })
}

function createRadioBtn(details) {
    let ul = document.getElementById("MentorList")
    ul.innerHTML = ''
    details.forEach((detail) => {
        var li = document.createElement("li")
        li.style.listStyleType = "none"
        var inp1 = document.createElement("input")
        inp1.setAttribute("type", "radio")
        inp1.setAttribute("name", "mentor")
        inp1.setAttribute("value", detail.name)
        var label1 = document.createElement("label")
        label1.innerHTML = detail.name
        li.append(inp1, label1)
        ul.append(li)
    })
}

function createMentor() {
    let name = document.getElementById("mentorName").value
    let email = document.getElementById("mentorEmail").value
    fetch(url + "mentors", {
        method: "POST",
        body: JSON.stringify({ name, email }),
        headers: {
            "content-type": "application/json"
        }
    })
        .then(() => {
            document.getElementById("MentorList").innerHTML = "";
            document.getElementById("mentorName").value = "";
            document.getElementById("mentorEmail").value = ""
            alert("mentor created")
            getMentors()
        })
}

function getStudents() {
    fetch(url + "students")
        .then((resp) => {
            return resp.json()
        })
        .then((result) => {
            console.log(result.data)
            let details = result.data
            let listBtn = document.getElementById("studentBtn")
            listBtn.addEventListener('click', () => {
                createCheckBtn(details);
            })
        })
}

function createCheckBtn(details) {
    var ul = document.getElementById("studentList")
    ul.innerHTML = ''
    details.forEach((detail) => {
        var li = document.createElement("li")
        li.style.listStyleType = "none"
        var inp1 = document.createElement("input")
        inp1.setAttribute("type", "checkbox")
        inp1.setAttribute("name", "student")
        inp1.setAttribute("value", detail.name)
        var label1 = document.createElement("label")
        label1.innerHTML = detail.name
        li.append(inp1, label1)
        ul.append(li)
    })
}

function createStudent() {
    let name = document.getElementById("studentName").value
    let email = document.getElementById("studentEmail").value
    fetch(url + "students", {
        method: "POST",
        body: JSON.stringify({ name, email }),
        headers: {
            "content-type": "application/json"
        }
    })
        .then(() => {
            document.getElementById("studentList").innerHTML = "";
            document.getElementById("studentName").value = "";
            document.getElementById("studentEmail").value = ""
            alert("student created")
            getStudents()
        })
}


async function assignStudents() {
    var mentorName = await document.querySelectorAll(`[name="mentor"]`)
    var selected_mentor;
    for (var i = 0; i < mentorName.length; i++) {
        if (mentorName[i].checked) {
            console.log(mentorName[i].value)
            selected_mentor = mentorName[i].value
            break;
        }
    }

    var studentName = await document.querySelectorAll(`[name="student"]`)
    var selected_students = []
    for (var i = 0; i < studentName.length; i++) {
        if (studentName[i].checked) {
            //    console.log(studentName[i].value)
            selected_students.push(studentName[i].value)
        }
        console.log(selected_students)
    }

    if (selected_students.length > 0) {
        fetch(url + "assign", {
            method: "POST",
            body: JSON.stringify({ selected_mentor, selected_students }),
            headers: {
                "content-type": "application/json"
            }
        })
            .then(() => {
                createTable(selected_mentor, selected_students)
            })
    }

}

function createTable(selected_mentor, selected_students) {
    var tbody = document.getElementById("tbody")
    var tr = document.createElement("tr")
    var td1 = document.createElement("td")
    td1.setAttribute("id", "data1")
    var td2 = document.createElement("td")
    td2.setAttribute("id", "data2")

    td1.innerHTML = selected_mentor;
    td2.innerHTML = selected_students;
    tr.append(td1, td2)
    tbody.append(tr)
}
