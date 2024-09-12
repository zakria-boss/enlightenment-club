const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  // Seed Users
  const user1 = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      email: 'john@example.com',
      name: 'John Doe',
      password: await bcrypt.hash('password123', 10),
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'jane@example.com' },
    update: {},
    create: {
      email: 'jane@example.com',
      name: 'Jane Doe',
      password: await bcrypt.hash('password123', 10),
    },
  })

  // Seed Cabinet Members
  const member1 = await prisma.cabinetMember.create({
    data: {
      name: 'Alice',
      role: 'Minister of Finance',
      bio: 'Alice has extensive experience in finance and economics.',
      image: 'https://example.com/alice.jpg',
    },
  })

  const member2 = await prisma.cabinetMember.create({
    data: {
      name: 'Bob',
      role: 'Minister of Education',
      bio: 'Bob has worked in the education sector for over 20 years.',
      image: 'https://example.com/bob.jpg',
    },
  })

  // Seed Events
  const event1 = await prisma.event.create({
    data: {
      title: 'Annual Finance Summit',
      description: 'A summit to discuss the latest trends in finance.',
      date: new Date('2024-09-25'),
      time: '10:00 AM',
      location: 'New York City',
      image: 'https://example.com/finance-summit.jpg',
    },
  })

  const event2 = await prisma.event.create({
    data: {
      title: 'Education Conference 2024',
      description: 'A conference focused on education reform.',
      date: new Date('2024-11-10'),
      time: '9:00 AM',
      location: 'Los Angeles',
      image: 'https://example.com/education-conference.jpg',
    },
  })

  // Seed Blogs
  const blog1 = await prisma.blog.create({
    data: {
      title: 'Understanding Finance in 2024',
      content: 'A deep dive into the world of finance.',
      author: 'Alice',
      image: 'https://example.com/finance-blog.jpg',
      slug: 'understanding-finance-2024',
    },
  })

  const blog2 = await prisma.blog.create({
    data: {
      title: 'The Future of Education',
      content: 'Exploring the changes in education systems.',
      author: 'Bob',
      slug: 'future-of-education',
    },
  })

  // Seed FAQs
  const faq1 = await prisma.fAQ.create({
    data: {
      question: 'What is the purpose of this platform?',
      answer: 'The platform serves to provide updates and insights into various fields.',
    },
  })

  const faq2 = await prisma.fAQ.create({
    data: {
      question: 'How can I participate in events?',
      answer: 'You can sign up for events by visiting the events page.',
    },
  })
}

main()
  .then(() => {
    console.log('Seed data successfully added!')
  })
  .catch((error) => {
    console.error(error)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
