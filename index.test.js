const postcss = require('postcss')

const plugin = require('./')

async function run (input, output, opts = { }) {
  let result = await postcss([plugin(opts)]).process(input, { from: undefined })
  expect(result.css).toEqual(output)
  expect(result.warnings()).toHaveLength(0)
}


let input, output;

input = `
div {
    width: 50vwh
}`;
output = `
@media (orientation:landscape) {
    div {
        width: 50vh
    }
}
@media (orientation:portrait) {
    div {
        width: 50vw
    }
}`;

it('transforms vwh to vh (landscape) & vw (portrait)', async () => {
  await run(input, output)
});


input = `
div {
    width: 50vwh 
}
@media (orientation:landscape) {
    body {
        background-color: silver
    }
}
@media all and (orientation:portrait) {
    body {
        background-color: purple
    }
}`;
output = `
@media (orientation:landscape) {
    body {
        background-color: silver
    }
    div {
        width: 50vh
    }
}
@media (orientation:portrait) {
    body {
        background-color: purple
    }
    div {
        width: 50vw
    }
}`;

it('merges existing and generated @rules', async () => {
  await run(input, output)
});


input = `
div {
    width: 50vwh 
}
div {
    height: 50vwh 
}
@media (orientation:landscape) {
    div {
        background-color: pink
    }
}
@media (orientation:portrait) {
    div {
        background-color: lightblue
    }
}`;
output = `
@media (orientation:landscape) {
    div {
        background-color: pink;
        width: 50vh;
        height: 50vh
    }
}
@media (orientation:portrait) {
    div {
        background-color: lightblue;
        width: 50vw;
        height: 50vw
    }
}`;

it('merges all declarations of a repeating selector rule', async () => {
  await run(input, output)
});


input = `
div {
    width: 50vwh;
    background-color: pink
}`;
output = `
div {
    background-color: pink
}
@media (orientation:landscape) {
    div {
        width: 50vh
    }
}
@media (orientation:portrait) {
    div {
        width: 50vw
    }
}`;

it('leaves unrelated declarations in place', async () => {
  await run(input, output)
});


input = `
div {
    padding: 1vwh 20px 10vwh 3vwh
}`;
output = `
@media (orientation:landscape) {
    div {
        padding: 1vh 20px 10vh 3vh
    }
}
@media (orientation:portrait) {
    div {
        padding: 1vw 20px 10vw 3vw
    }
}`;

it('supports multiple vwh units per line', async () => {
  await run(input, output)
});


input = `
div {
    width: 10vwh
}
@supports selector(A > B) {
    div > span {
        border-top: 1px orange solid
    }
}
@media screen and (max-width: 600px) {
    div {
        font-family: serif
    }
}`;
output = `
@supports selector(A > B) {
    div > span {
        border-top: 1px orange solid
    }
}
@media screen and (max-width: 600px) {
    div {
        font-family: serif
    }
}
@media (orientation:landscape) {
    div {
        width: 10vh
    }
}
@media (orientation:portrait) {
    div {
        width: 10vw
    }
}`;

it('doesn\'t care for irrelevant media queries', async () => {
  await run(input, output)
});
