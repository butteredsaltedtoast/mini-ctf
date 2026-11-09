# my mini ctf

hello! this is a small ctf platform i wrote for terra week three!

## current status

currently i've got register and login, flag submission, and a scoreboard. two playable challenges, web and intro.
the other challenges are coming next week! for now, we've got web and intro, so have fun with those.
frontend pages exist too.

## ok, so how do i test it?

it's live [here](https://mini-ctf-gzpn.onrender.com/)! it does reset because render sucks but... what can you do.
for now, you can follow the following steps:

1. clone the repo, then run `npm install`
2. copy `.env.example` to `.env` then fill in the missing values
3. run `npx prisma migrate dev --config prisma7.config.ts` then `npx prisma generate --config prisma7.config.ts` and THEN `npx tsx prisma/seed.ts`
4. finally, run `npm run dev`

if you want to test flag submission, just submit the intro challenge! it's intentionally free for people who've never played a ctf and for reviewers that wanna get through it fast.

## why'd you make this pal

i do web dev often, but i'm interested in cybersecurity too!!
i participate and have participated in lots of ctfs. and i thought, "hey, i need practice writing challs. let's take advantage of terra forcing me to work anyway!" if you wanna know more about my cyber stuff check out my [personal website!](https://butteredtoast.pages.dev/)

## ...did you use ai?

all the code is written by MEEEEE!!! however, since i've never used prisma, i used claude to explain concepts and give small EXAMPLE code snippets. what do i mean by example? basically, if i have the idea, "hmm, there's going to be a time discrepancy on login when the team exists and the password is wrong (because it takes a little to run compare) vs the team not existing (no compare)! that's bad! but how do i make it take longer?" i'm not going to ask claude, "claudeee helppp code the entire thing for meee ahhh" because that's atrocious. INSTEAD, i ask it for an example code block or explanation. it makes one about pizzas or something. it did actually do that once. and i can see the structure and write my OWN code! and _learn_ (wow). i did also use it for code review and subsequent bug fixing, though, so feel free to slime me for that.

## what do i get if my team wins

infinite glory
