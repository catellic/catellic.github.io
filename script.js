const qaReposObj = {
    "qa-cypress": "https://github.com/catellic/qa-cypress-ui-tests",
    "qa-playwright": "https://github.com/catellic/qa-playwright-ui-tests",
    "qa-postman": "https://github.com/catellic/qa-postman-newman-tests"
}

const devReposObj = {
    "dev-landingPage": "https://catellic.github.io/landing-page/",
    "dev-scissorsPaperRock": "https://catellic.github.io/scissor-paper-rock/"
}

const resumeObj = {
    "cv-christian-catelli": "test"
}

const socialObj = {
    "linkedin": "https://www.linkedin.com/in/christian-catelli",
    "github": "https://github.com/catellic"
}

// individua selectors fondamentali
const qaWrapper = document.querySelector(`#qa`),
    devWrapper = document.querySelector(`#dev`),
    resumeWrapper = document.querySelector(`#resume`),
    footerWrapper = document.querySelector(`.footer`)

// little util

function appendEl(parent, child) {
    parent.appendChild(child);
}


/* naming convention: 
- build: also contains appending of elements with others
- create: no appending just creation and modification of internal properties of the element */

function buildArrow(parent) {
    const arrw = document.createElement(`div`);
    arrw.textContent = `+++`;
    arrw.classList = ('arrow')
    parent.appendChild(arrw)
    return arrw
}

function buildRepoCard(repoName, repoUrl) {
    const div = createDiv(repoName)
    const btn = createBtn(repoName)
    const lnk = createLink(repoUrl)

    appendEl(lnk, btn)
    appendEl(div, lnk)
    return div
}

function buildRepoContainer(wrapper, object) {
    if (wrapper !== footerWrapper) {
        buildArrow(wrapper);
    }

    for (let key in object) {
        const repo = buildRepoCard(key, object[key]);
        // wrapper.appendChild(repo)
        appendEl(wrapper, repo)
    }
}


function createLink(url) {
    const lnk = document.createElement(`a`)
    lnk.href = url
    lnk.target = `__blank`
    return lnk
}

function createBtn(buttonName) {
    const btn = document.createElement(`button`)
    btn.textContent = buttonName
    btn.classList = `btn`
    return btn
}

function createDiv(divName) {
    const div = document.createElement(`div`)
    div.id = divName
    return div
}

// actual scripting

buildRepoContainer(qaWrapper, qaReposObj)
buildRepoContainer(devWrapper, devReposObj)
buildRepoContainer(resumeWrapper, resumeObj)
buildRepoContainer(footerWrapper, socialObj)



