"use strict";
// regex for validation
const strRegex = /^[a-zA-Z\s]*$/; // containing only letters
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const digitRegex = /^\d+$/;
const mainForm = document.getElementById('cv-form');
const validType = {
    TEXT: 'text',
    TEXT_EMP: 'text_emp',
    EMAIL: 'email',
    DIGIT: 'digit',
    PHONENO: 'phoneno',
    ANY: 'any',
};
// Define input elements with proper type casting
const firstnameElem = mainForm.elements.namedItem('firstname');
const middlenameElem = mainForm.elements.namedItem('middlename');
const lastnameElem = mainForm.elements.namedItem('lastname');
const imageElem = mainForm.elements.namedItem('image');
const designationElem = mainForm.elements.namedItem('designation');
const addressElem = mainForm.elements.namedItem('address');
const emailElem = mainForm.elements.namedItem('email');
const phonenoElem = mainForm.elements.namedItem('phoneno');
const summaryElem = mainForm.elements.namedItem('summary');
// Define display elements with proper type casting
const nameDsp = document.getElementById('fullname_dsp');
const imageDsp = document.getElementById('image_dsp');
const phonenoDsp = document.getElementById('phoneno_dsp');
const emailDsp = document.getElementById('email_dsp');
const addressDsp = document.getElementById('address_dsp');
const designationDsp = document.getElementById('designation_dsp');
const summaryDsp = document.getElementById('summary_dsp');
const projectsDsp = document.getElementById('projects_dsp');
const achievementsDsp = document.getElementById('achievements_dsp');
const skillsDsp = document.getElementById('skills_dsp');
const educationsDsp = document.getElementById('educations_dsp');
const experiencesDsp = document.getElementById('experiences_dsp');
// Function to fetch values from node lists
const fetchValues = (attrs, ...nodeLists) => {
    const elemsAttrsCount = nodeLists.length;
    const elemsDataCount = nodeLists[0].length;
    const tempDataArr = [];
    for (let i = 0; i < elemsDataCount; i++) {
        const dataObj = {};
        for (let j = 0; j < elemsAttrsCount; j++) {
            dataObj[attrs[j]] = nodeLists[j][i].value;
        }
        tempDataArr.push(dataObj);
    }
    return tempDataArr;
};
const getUserInputs = () => {
    const achievementsTitleElem = Array.from(document.querySelectorAll('.achieve_title'));
    const achievementsDescriptionElem = Array.from(document.querySelectorAll('.achieve_description'));
    const expTitleElem = Array.from(document.querySelectorAll('.exp_title'));
    const expOrganizationElem = Array.from(document.querySelectorAll('.exp_organization'));
    const expLocationElem = Array.from(document.querySelectorAll('.exp_location'));
    const expStartDateElem = Array.from(document.querySelectorAll('.exp_start_date'));
    const expEndDateElem = Array.from(document.querySelectorAll('.exp_end_date'));
    const expDescriptionElem = Array.from(document.querySelectorAll('.exp_description'));
    const eduSchoolElem = Array.from(document.querySelectorAll('.edu_school'));
    const eduDegreeElem = Array.from(document.querySelectorAll('.edu_degree'));
    const eduCityElem = Array.from(document.querySelectorAll('.edu_city'));
    const eduStartDateElem = Array.from(document.querySelectorAll('.edu_start_date'));
    const eduGraduationDateElem = Array.from(document.querySelectorAll('.edu_graduation_date'));
    const eduDescriptionElem = Array.from(document.querySelectorAll('.edu_description'));
    const projTitleElem = Array.from(document.querySelectorAll('.proj_title'));
    const projLinkElem = Array.from(document.querySelectorAll('.proj_link'));
    const projDescriptionElem = Array.from(document.querySelectorAll('.proj_description'));
    const skillElem = Array.from(document.querySelectorAll('.skill'));
    // Event listeners for form validation
    firstnameElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'First Name'));
    middlenameElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT_EMP, 'Middle Name'));
    lastnameElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'Last Name'));
    phonenoElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.PHONENO, 'Phone Number'));
    emailElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.EMAIL, 'Email'));
    addressElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Address'));
    designationElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'Designation'));
    achievementsTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));
    achievementsDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    expTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));
    expOrganizationElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Organization')));
    expLocationElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, "Location")));
    expStartDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'End Date')));
    expEndDateElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'End Date')));
    expDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    eduSchoolElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'School')));
    eduDegreeElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Degree')));
    eduCityElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'City')));
    eduStartDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'Start Date')));
    eduGraduationDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'Graduation Date')));
    eduDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    projTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));
    projLinkElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Link')));
    projDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    skillElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'skill')));
    return {
        firstname: firstnameElem.value,
        middlename: middlenameElem.value,
        lastname: lastnameElem.value,
        designation: designationElem.value,
        address: addressElem.value,
        email: emailElem.value,
        phoneno: phonenoElem.value,
        summary: summaryElem.value,
        achievements: fetchValues(['achieve_title', 'achieve_description'], achievementsTitleElem, achievementsDescriptionElem),
        experiences: fetchValues(['exp_title', 'exp_organization', 'exp_location', 'exp_start_date', 'exp_end_date', 'exp_description'], expTitleElem, expOrganizationElem, expLocationElem, expStartDateElem, expEndDateElem, expDescriptionElem),
        educations: fetchValues(['edu_school', 'edu_degree', 'edu_city', 'edu_start_date', 'edu_graduation_date', 'edu_description'], eduSchoolElem, eduDegreeElem, eduCityElem, eduStartDateElem, eduGraduationDateElem, eduDescriptionElem),
        projects: fetchValues(['proj_title', 'proj_link', 'proj_description'], projTitleElem, projLinkElem, projDescriptionElem),
        skills: fetchValues(['skill'], skillElem)
    };
};
function validateFormData(elem, elemType, elemName) {
    if (elemType === validType.TEXT) {
        if (!strRegex.test(elem.value) || elem.value.trim().length === 0)
            addErrMsg(elem, elemName);
        else
            removeErrMsg(elem);
    }
    if (elemType === validType.TEXT_EMP) {
        if (!strRegex.test(elem.value))
            addErrMsg(elem, elemName);
        else
            removeErrMsg(elem);
    }
    if (elemType === validType.EMAIL) {
        if (!emailRegex.test(elem.value) || elem.value.trim().length === 0)
            addErrMsg(elem, elemName);
        else
            removeErrMsg(elem);
    }
    if (elemType === validType.PHONENO) {
        if (!phoneRegex.test(elem.value) || elem.value.trim().length === 0)
            addErrMsg(elem, elemName);
        else
            removeErrMsg(elem);
    }
    if (elemType === validType.ANY) {
        if (elem.value.trim().length === 0)
            addErrMsg(elem, elemName);
        else
            removeErrMsg(elem);
    }
}
function addErrMsg(formElem, formElemName) {
    const errorElem = formElem.nextElementSibling;
    errorElem.innerHTML = `${formElemName} is invalid`;
}
function removeErrMsg(formElem) {
    const errorElem = formElem.nextElementSibling;
    errorElem.innerHTML = "";
}
const showListData = (listData, listContainer) => {
    listContainer.innerHTML = "";
    listData.forEach(listItem => {
        const itemElem = document.createElement('div');
        itemElem.classList.add('preview-item');
        for (const key in listItem) {
            const subItemElem = document.createElement('span');
            subItemElem.classList.add('preview-item-val');
            subItemElem.innerHTML = `${listItem[key]}`;
            itemElem.appendChild(subItemElem);
        }
        listContainer.appendChild(itemElem);
    });
};
const displayCV = (userData) => {
    nameDsp.innerHTML = `${userData.firstname} ${userData.middlename} ${userData.lastname}`;
    phonenoDsp.innerHTML = userData.phoneno;
    emailDsp.innerHTML = userData.email;
    addressDsp.innerHTML = userData.address;
    designationDsp.innerHTML = userData.designation;
    summaryDsp.innerHTML = userData.summary;
    showListData(userData.projects, projectsDsp);
    showListData(userData.achievements, achievementsDsp);
    showListData(userData.skills, skillsDsp);
    showListData(userData.educations, educationsDsp);
    showListData(userData.experiences, experiencesDsp);
};
const generateCV = () => {
    const userData = getUserInputs();
    displayCV(userData);
    console.log(userData);
};
function previewImage() {
    if (imageElem.files && imageElem.files[0]) {
        const oFReader = new FileReader();
        oFReader.readAsDataURL(imageElem.files[0]);
        oFReader.onload = (ofEvent) => {
            const target = ofEvent.target;
            if (target.result) {
                imageDsp.src = target.result;
            }
        };
    }
    else {
        // Handle the case when no file is selected
        imageDsp.src = ''; // Or set a default image
    }
}
function printCV() {
    window.print();
}
