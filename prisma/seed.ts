import "dotenv/config"
import {prisma} from "../src/lib/prisma"
import {hash} from "bcryptjs"

const challenges = [
    {
        title: "wrapper",
        description: "in a ctf, the flags you are trying to find usually have a wrapper. here, it's terra{<flag>}! try submitting this challenge's flag, welcome, in the wrapper.",
        category: "intro",
        points: 100,
        flag: process.env["FLAG_INTRO"],
        fileUrl: null
    },
    {
        title: "oops",
        description: "there seems to be something left in the source code of this website...",
        category: "web",
        points: 200,
        flag: process.env["FLAG_WEB"],
        fileUrl: null
    },
    {
        title: "onion",
        description: "someone left this string lying around next to an onion??\n",
        category: "crypto",
        points: 200,
        flag: process.env["FLAG_CRYPTO"],
        fileUrl: "/challenges/onion.txt"
    },
    {
        title: "optimism",
        description: "it's important to keep a glass half full mindset! wouldn't want the glass to spill after all!!",
        category: "pwn",
        points: 200,
        flag: process.env["FLAG_PWN"],
        fileUrl: "/challenges/optimism.zip"
    },
    {
        title: "eg",
        description: "...it's just a picture of an egg. what can you even hide in an image?",
        category: "forensics",
        points: 200,
        flag: process.env["FLAG_FORENSICS"],
        fileUrl: "/challenges/eg.jpg",
    },
    {
        title: "needle in a haystack",
        description: "wha- how am i supposed to find the flag amidst all this?!",
        category: "misc",
        points: 200,
        flag: process.env["FLAG_MISC"],
        fileUrl: "/challenges/log.txt"
    },
];


async function main() {
    if(challenges.some(challenge => !challenge.flag))
    {
        console.error("one of the challs is missing a flag!");
        process.exit(1);
    }
    await prisma.submission.deleteMany({});
    await prisma.challenge.deleteMany({});

    let created = 0

    for (const challenge of challenges) {
        await prisma.challenge.create({
            data: {
                title: challenge.title,
                description: challenge.description,
                category: challenge.category,
                points: challenge.points,
                flagHash: await hash(challenge.flag!, 10),
                fileUrl: challenge.fileUrl
            }
        });
        created++;
    }
    console.log("seeded " + created + " challenges!");
}

main().catch((e) => {
    console.error(e);
    process.exitCode = 1;
}).finally(async () => {await prisma.$disconnect()});