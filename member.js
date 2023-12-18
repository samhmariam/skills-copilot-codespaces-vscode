function skillsMember() {
    var skills = document.getElementById("skills");
    var member = document.getElementById("member");
    var memberName = document.getElementById("memberName");

    if (skills.style.display === "none") {
        skills.style.display = "block";
        member.style.display = "none";
        memberName.style.display = "none";
    } else {
        skills.style.display = "none";
        member.style.display = "block";
        memberName.style.display = "block";
    }
}