// regex for validation
const strRegex: RegExp = /^[a-zA-Z\s]*$/; // containing only letters
const emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex: RegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const digitRegex: RegExp = /^\d+$/;

const mainForm = document.getElementById('cv-form') as HTMLFormElement;
const validType = {
    TEXT: 'text',
    TEXT_EMP: 'text_emp',
    EMAIL: 'email',
    DIGIT: 'digit',
    PHONENO: 'phoneno',
    ANY: 'any',
};

// Define input elements with proper type casting
const firstnameElem = mainForm.elements.namedItem('firstname') as HTMLInputElement;
const middlenameElem = mainForm.elements.namedItem('middlename') as HTMLInputElement;
const lastnameElem = mainForm.elements.namedItem('lastname') as HTMLInputElement;
const imageElem = mainForm.elements.namedItem('image') as HTMLInputElement;
const designationElem = mainForm.elements.namedItem('designation') as HTMLInputElement;
const addressElem = mainForm.elements.namedItem('address') as HTMLInputElement;
const emailElem = mainForm.elements.namedItem('email') as HTMLInputElement;
const phonenoElem = mainForm.elements.namedItem('phoneno') as HTMLInputElement;
const summaryElem = mainForm.elements.namedItem('summary') as HTMLInputElement;

// Define display elements with proper type casting
const nameDsp = document.getElementById('fullname_dsp') as HTMLDivElement;
const imageDsp = document.getElementById('image_dsp') as HTMLImageElement;
const phonenoDsp = document.getElementById('phoneno_dsp') as HTMLDivElement;
const emailDsp = document.getElementById('email_dsp') as HTMLDivElement;
const addressDsp = document.getElementById('address_dsp') as HTMLDivElement;
const designationDsp = document.getElementById('designation_dsp') as HTMLDivElement;
const summaryDsp = document.getElementById('summary_dsp') as HTMLDivElement;
const projectsDsp = document.getElementById('projects_dsp') as HTMLDivElement;
const achievementsDsp = document.getElementById('achievements_dsp') as HTMLDivElement;
const skillsDsp = document.getElementById('skills_dsp') as HTMLDivElement;
const educationsDsp = document.getElementById('educations_dsp') as HTMLDivElement;
const experiencesDsp = document.getElementById('experiences_dsp') as HTMLDivElement;

interface ValueObject {
    [key: string]: string;
}

// Function to fetch values from node lists
const fetchValues = (attrs: string[], ...nodeLists: HTMLInputElement[][]): ValueObject[] => {
    const elemsAttrsCount = nodeLists.length;
    const elemsDataCount = nodeLists[0].length;
    const tempDataArr: ValueObject[] = [];

    for (let i = 0; i < elemsDataCount; i++) {
        const dataObj: ValueObject = {};
        for (let j = 0; j < elemsAttrsCount; j++) {
            dataObj[attrs[j]] = nodeLists[j][i].value;
        }
        tempDataArr.push(dataObj);
    }

    return tempDataArr;
};

// Function to generate a unique URL for the resume
function generateUniqueURL(username: string): string {
    return `https://q2-hackathon.vercel.app/resume/${username}`;
}

// Function to update the resume link based on the form input after CV creation
function updateResumeLink() {
    const firstNameInput = document.querySelector('.firstname') as HTMLInputElement;
    const middleNameInput = document.querySelector('.middlename') as HTMLInputElement;
    const lastNameInput = document.querySelector('.lastname') as HTMLInputElement;

    // Extract username from the form inputs
    const firstName = firstNameInput.value.trim();
    const middleName = middleNameInput.value.trim();
    const lastName = lastNameInput.value.trim();

    // Generate username
    const username = `${firstName}.${lastName}`.toLowerCase();

    if (username) {
        const resumeLink = generateUniqueURL(username);
        const resumeLinkInput = document.querySelector('#resumeLink') as HTMLInputElement;
        resumeLinkInput.value = resumeLink;

        // Display the URL section
        const urlSection = document.querySelector('#urlSection') as HTMLElement;
        urlSection.style.display = 'block';
    } else {
        alert('Please fill out your name fields.');
    }
}

// Function to copy the generated resume link to the clipboard
function copyLink() {
    const resumeLink = document.querySelector('#resumeLink') as HTMLInputElement;
    resumeLink.select();
    document.execCommand('copy');
    alert('Link copied to clipboard!');
}

const getUserInputs = () => {
    const achievementsTitleElem = Array.from(document.querySelectorAll('.achieve_title')) as HTMLInputElement[];
    const achievementsDescriptionElem = Array.from(document.querySelectorAll('.achieve_description')) as HTMLInputElement[];

    const expTitleElem = Array.from(document.querySelectorAll('.exp_title')) as HTMLInputElement[];
    const expOrganizationElem = Array.from(document.querySelectorAll('.exp_organization')) as HTMLInputElement[];
    const expLocationElem = Array.from(document.querySelectorAll('.exp_location')) as HTMLInputElement[];
    const expStartDateElem = Array.from(document.querySelectorAll('.exp_start_date')) as HTMLInputElement[];
    const expEndDateElem = Array.from(document.querySelectorAll('.exp_end_date')) as HTMLInputElement[];
    const expDescriptionElem = Array.from(document.querySelectorAll('.exp_description')) as HTMLInputElement[];

    const eduSchoolElem = Array.from(document.querySelectorAll('.edu_school')) as HTMLInputElement[];
    const eduDegreeElem = Array.from(document.querySelectorAll('.edu_degree')) as HTMLInputElement[];
    const eduCityElem = Array.from(document.querySelectorAll('.edu_city')) as HTMLInputElement[];
    const eduStartDateElem = Array.from(document.querySelectorAll('.edu_start_date')) as HTMLInputElement[];
    const eduGraduationDateElem = Array.from(document.querySelectorAll('.edu_graduation_date')) as HTMLInputElement[];
    const eduDescriptionElem = Array.from(document.querySelectorAll('.edu_description')) as HTMLInputElement[];

    const projTitleElem = Array.from(document.querySelectorAll('.proj_title')) as HTMLInputElement[];
    const projLinkElem = Array.from(document.querySelectorAll('.proj_link')) as HTMLInputElement[];
    const projDescriptionElem = Array.from(document.querySelectorAll('.proj_description')) as HTMLInputElement[];

    const skillElem = Array.from(document.querySelectorAll('.skill')) as HTMLInputElement[];

    // Event listeners for form validation
    firstnameElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.TEXT, 'First Name'));
    middlenameElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.TEXT_EMP, 'Middle Name'));
    lastnameElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.TEXT, 'Last Name'));
    phonenoElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.PHONENO, 'Phone Number'));
    emailElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.EMAIL, 'Email'));
    addressElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Address'));
    designationElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.TEXT, 'Designation'));

    document.querySelector('#generateResumeLinkBtn')?.addEventListener('click', updateResumeLink);
    document.querySelector('#copyLinkBtn')?.addEventListener('click', copyLink);

    achievementsTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Title')));
    achievementsDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Description')));
    expTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Title')));
    expOrganizationElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Organization')));
    expLocationElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, "Location")));
    expStartDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'End Date')));
    expEndDateElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'End Date')));
    expDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Description')));
    eduSchoolElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'School')));
    eduDegreeElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Degree')));
    eduCityElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'City')));
    eduStartDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Start Date')));
    eduGraduationDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Graduation Date')));
    eduDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Description')));
    projTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Title')));
    projLinkElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Link')));
    projDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Description')));
    skillElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'skill')));

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

function validateFormData(elem: HTMLInputElement, elemType: string, elemName: string): void {
    if (elemType === validType.TEXT) {
        if (!strRegex.test(elem.value) || elem.value.trim().length === 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    if (elemType === validType.TEXT_EMP) {
        if (!strRegex.test(elem.value)) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    if (elemType === validType.EMAIL) {
        if (!emailRegex.test(elem.value) || elem.value.trim().length === 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    if (elemType === validType.PHONENO) {
        if (!phoneRegex.test(elem.value) || elem.value.trim().length === 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    if (elemType === validType.ANY) {
        if (elem.value.trim().length === 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }
}

function addErrMsg(formElem: HTMLInputElement, formElemName: string): void {
    const errorElem = formElem.nextElementSibling as HTMLElement;
    errorElem.innerHTML = `${formElemName} is invalid`;
}

function removeErrMsg(formElem: HTMLInputElement): void {
    const errorElem = formElem.nextElementSibling as HTMLElement;
    errorElem.innerHTML = "";
}

const showListData = (listData: ValueObject[], listContainer: HTMLDivElement): void => {
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

const displayCV = (userData: any): void => {
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

const generateCV = (): void => {
    const userData = getUserInputs();
    displayCV(userData);
    console.log(userData);

    // After generating the CV, make the URL section visible
    const urlSection = document.querySelector('#urlSection') as HTMLElement;
    urlSection.style.display = 'block';
};

function previewImage(): void {
    if (imageElem.files && imageElem.files[0]) {
        const oFReader = new FileReader();
        oFReader.readAsDataURL(imageElem.files[0]);
        oFReader.onload = (ofEvent: ProgressEvent<FileReader>) => {
            const target = ofEvent.target as FileReader;
            if (target.result) {
                imageDsp.src = target.result as string;
            }
        };
    } else {
        // Handle the case when no file is selected
        imageDsp.src = ''; // Or set a default image
    }
}

function printCV(): void {
    window.print();
}
