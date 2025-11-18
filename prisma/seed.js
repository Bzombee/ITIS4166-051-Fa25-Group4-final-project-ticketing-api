import bcrypt from 'bcrypt';
import { PrismaClient } from '../src/generated/prisma/index.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // --- Clean up existing data (order matters due to foreign keys) ---
  await prisma.orderTicket.deleteMany();
  await prisma.order.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.event.deleteMany();
  await prisma.user.deleteMany();

  // --- Create Users ---
  const usersData = [
    {
      name: 'Alice Organizer',
      email: 'alice@test.com',
      birthday: new Date('1990-05-14'),
      password: await bcrypt.hash('alice1234', 10),
      role: 'ORGANIZER',
    },
    {
      name: 'Bob Customer',
      email: 'bob@example.com',
      birthday: new Date('1995-09-22'),
      password: await bcrypt.hash('bob12345', 10),
      role: 'CUSTOMER',
    },
    {
      name: 'Charlie Admin',
      email: 'charlie@demo.com',
      birthday: new Date('1985-03-11'),
      password: await bcrypt.hash('charlie1234', 10),
      role: 'ADMIN',
    },
  ];

  const users = await prisma.$transaction(
    usersData.map((user) => prisma.user.create({ data: user }))
  );

  const organizer = users.find((u) => u.role === 'ORGANIZER');
  const customer = users.find((u) => u.role === 'CUSTOMER');

  // --- Create Events (by Organizer) ---
  const event = await prisma.event.create({
    data: {
      title: 'Rock Concert 2025',
      date: new Date('2025-07-12T20:00:00Z'),
      location: 'Downtown Arena',
      description: 'A night of rock and roll featuring local bands.',
      eventType: 'MUSIC',
      ticketsAvailable: 3,
      organizerId: organizer.id,
    },
  });

  // --- Create Tickets for the Event ---
  const tickets = await prisma.$transaction([
    prisma.ticket.create({
      data: { price: 49.99, seatNumber: 'A1', eventId: event.id },
    }),
    prisma.ticket.create({
      data: { price: 49.99, seatNumber: 'A2', eventId: event.id },
    }),
    prisma.ticket.create({
      data: { price: 59.99, seatNumber: 'VIP1', eventId: event.id },
    }),
  ]);

  // --- Create an Order for Customer ---
  const order = await prisma.order.create({
    data: {
      total: tickets[0].price + tickets[1].price,
      userId: customer.id,
      orderStatus: 'COMPLETED',
    },
  });

  // --- Link Tickets to Order (OrderTickets join table) ---
  await prisma.orderTicket.createMany({
    data: [
      { orderId: order.id, ticketId: tickets[0].id },
      { orderId: order.id, ticketId: tickets[1].id },
    ],
  });

  // --- Update ticket statuses to SOLD ---
  await prisma.ticket.updateMany({
    where: { id: { in: [tickets[0].id, tickets[1].id] } },
    data: { ticketStatus: 'SOLD' },
  });

  console.log('✅ Database seeding completed successfully!');
}

main()
  .catch((error) => {
    console.error('❌ Seed failed:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
