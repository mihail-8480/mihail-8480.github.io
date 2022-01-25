import './css/styles.css';

interface A {
    test : string;
}

function log(something : A) {
    console.log(something);
}

log({test: "Typescript Works!"});