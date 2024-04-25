import { hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    const hashed_password = await hash("userpass", 12);
    const user1 = await prisma.user.create({
      data: {
        email: "john@email.com",
        name: "John Doe",
        password: hashed_password,
      },
    });
    const user2 = await prisma.user.create({
      data: {
        email: "henry@email.com",
        name: "Henry Smith",
        password: hashed_password,
      },
    });

    const firstPost = await prisma.post.create({
      data: {
        title: "First Post",
        content:
          "<p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:</p>",
        // members: {
        //   connect: [{ id: user1.id }, { id: user2.id }],
        // },
        tags: ["news", "education"],
        authorId: user1.id,
      },
    });

    const secondPost = await prisma.post.create({
      data: {
        title: "Second Post",
        content:
          "<p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:</p>",

        tags: ["coding"],
        authorId: user2.id,
      },
    });
    const thirdPost = await prisma.post.create({
      data: {
        title: "Third Post",
        content:
          "<p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:</p>",

        tags: ["enternainment", "coding"],
        authorId: user1.id,
      },
    });
    const fourthPost = await prisma.post.create({
      data: {
        title: "Fourth Post",
        content:
          "<p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:</p>",

        authorId: user2.id,
      },
    });
    const fifthPost = await prisma.post.create({
      data: {
        title: "Fifth Post",
        content:
          "<p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:</p>",

        authorId: user2.id,
      },
    });

    await prisma.comment.create({
      data: {
        content: "Dummy Comment",
        commenterId: user1.id,
        postId: firstPost.id,
      },
    });
    await prisma.comment.create({
      data: {
        content: "Dummy Comment second",
        commenterId: user2.id,
        postId: firstPost.id,
      },
    });
    await prisma.comment.create({
      data: {
        content: "Dummy Comment",
        commenterId: user2.id,
        postId: secondPost.id,
      },
    });
  } catch (err) {}
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
