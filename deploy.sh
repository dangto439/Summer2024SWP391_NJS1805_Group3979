echo "Building app..."
npm run build
echo "Deploy files to server..."
scp -r dist/* root@157.245.153.47:/var/www/html/
echo "Done!"


