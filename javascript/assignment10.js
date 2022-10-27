// helper functions
function printEmployee(employee){
    console.log('employee:', employee.name, ',', employee.department, ',', employee.designation, ',', employee.salary, ',', employee.isRaiseEligible);
}

function printCompany(companyObj){
    console.log('company:', companyObj.companyName, ',', companyObj.website, ',', company.employees);
}

// problem 1
console.log('---PROBLEM 1:');

let sam = {
    'name': 'Sam',
    'department': 'Tech',
    'designation': 'Manager',
    'salary': 40000,
    'isRaiseEligible': true
}

let mary = {
    'name': 'Mary',
    'department': 'Finance',
    'designation': 'Trainee',
    'salary': 18500,
    'isRaiseEligible': true
}

let bill = {
    'name': 'Bill',
    'department': 'HR',
    'designation': 'Executive',
    'salary': 21200,
    'isRaiseEligible': false
}
printEmployee(sam);
printEmployee(mary);
printEmployee(bill);

//  problem 2
console.log('\n---PROBLEM 2:');

let company = {
    'companyName': 'Tech Stars',
    'website': 'www.techstars.site',
    'employees': [
        sam,
        mary,
        bill
    ]
}

printCompany(company);

//  problem 3
console.log('\n---PROBLEM 3:');

let anna ={
    'name': 'Anna',
    'department': 'Tech',
    'designation': 'Executive',
    'salary': 25600,
    'isRaiseEligible': false
}

company.employees.push(anna);
printEmployee(anna);
printCompany(company);

// problem 4
console.log('\n---PROBLEM 4:');

let totalSalary = 0;
for(let person of company.employees){
    totalSalary += person.salary;
}

console.log('total salary: ', totalSalary);

// problem 5
console.log('\n---PROBLEM 5:');

for(let person of company.employees){
    if(person.isRaiseEligible){
        let oldSalary = person.salary;
        let newSalary = oldSalary + (oldSalary * 0.1);
        
        // update values
        person.salary = newSalary;
        person.isRaiseEligible = false;
    }

    // console printing
    printEmployee(person);
}

// problem 6
console.log('\n---PROBLEM 6:');

for(let person of company.employees){
    if(person.name === 'Anna' || person.name === 'Sam'){
        person.wfh = true;
    }else{
        person.wfh = false;
    }
    printEmployee(person);
    console.log('wfh: ', person.wfh);
}
