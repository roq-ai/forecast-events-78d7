import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { renamedfunctionValidationSchema } from 'validationSchema/renamedfunctions';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.renamedfunction
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getRenamedfunctionById();
    case 'PUT':
      return updateRenamedfunctionById();
    case 'DELETE':
      return deleteRenamedfunctionById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getRenamedfunctionById() {
    const data = await prisma.renamedfunction.findFirst(convertQueryToPrismaUtil(req.query, 'renamedfunction'));
    return res.status(200).json(data);
  }

  async function updateRenamedfunctionById() {
    await renamedfunctionValidationSchema.validate(req.body);
    const data = await prisma.renamedfunction.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteRenamedfunctionById() {
    const data = await prisma.renamedfunction.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
