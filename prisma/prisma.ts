
/*

Multi Service Platform - Prisma Singleton Class
Created: Feb. 08, 2022
Last Updated: Feb. 08, 2022
Author: Tolentino, Francis James S.

*/

import { PrismaClient }from "@prisma/client";


const prisma = new PrismaClient();


export default prisma;