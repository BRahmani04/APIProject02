import{postRequestBody, putRequestBody, patchRequestBody} from '../fixtures/testData.json'

describe('API Project 02', () => {
    let studentId;

    it('Retrive a list of all users', () => {
        cy.request({
            method: 'Get',
            url: 'https://tech-global-training.com/students',
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.duration).to.below(200)
            expect(response.body.length).to.greaterThan(1)
            expect(response.body[1].firstName).to.eq('John')
            expect(response.body[1].lastName).to.eq('Doe')
            
        })
    })
    it('Create a new user', () => {
        cy.request({
            method: 'Post',
            url: 'https://tech-global-training.com/students',
            body: postRequestBody
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.duration).to.below(200)
            cy.validateResponse(response, postRequestBody)
            studentId = response.body.id
        })
    })
    it('Retrieve a specific user-created', () => {
        cy.request({
            method: 'Get',
            url: `https://tech-global-training.com/students/${studentId}`
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.duration).to.below(200)
            cy.validateResponse(response, postRequestBody)
        })
    })
    it('Update an existing user', () => {
        cy.request({
            method: 'Put',
            url: `https://tech-global-training.com/students/${studentId}`,
            body: putRequestBody
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.duration).to.below(200)
            cy.validateResponse(response, putRequestBody)
        })
    })
    it('Partially update an existing User', () => {
        cy.request({
            method: 'Patch',
            url: `https://tech-global-training.com/students/${studentId}`,
            body: patchRequestBody
        }).then((response) => {
            expect(response.status).to.eq(200)
            cy.validateResponse(response, patchRequestBody)
        })
    })
    it('Retrieve a list of all users again', () => {
        cy.request({
            method: 'Get',
            url: 'https://tech-global-training.com/students',
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.duration).to.below(200)
            expect(response.body.length).to.greaterThan(2)
        })
    })
    it('Retrieve a specific user created to confirm the update', () => {
        cy.request({
            method: 'Get',
            url: `https://tech-global-training.com/students/${studentId}`,
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.duration).to.below(200)
            cy.validateResponse(response, patchRequestBody)
        })
    })
    it('Finally, delete the user that you created', () => {
        cy.request({
            method: 'Delete',
            url: `https://tech-global-training.com/students/${studentId}`,
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    })
})