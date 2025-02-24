## 服务器部署
1. pnpm run build
2. 上传以下文件
   1. package.json pnpm-lock
   2. .next
   3. lib
3. 服务器执行 pnpm install --production
4. 运行 pnpm run db:migrate //? 这个实际上是一个脚本。我麻了。
5. pnpm run start 或者 pm2 start xxxx