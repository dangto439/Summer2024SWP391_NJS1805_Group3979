echo "Building app..."
npm run build
echo "Deploy files to server..."
scp -r dist/* root@134.209.34.114:/var/www/html/
echo "Done!"


