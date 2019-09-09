echo "Unziping files and removinf zip files"
find ./data-works/ -name '*.zip' -exec sh -c 'unzip -d `dirname {}` {}' ';'
find ./data-works/ -name "*.zip" -exec rm -rf {} \;
echo "Looking dis folders"
HOME="$(pwd)"
for line in $(find ./data-works -name dist); do 
  echo "Adjusting dist folder: $line"
  cd "$line"
  mv * ../../
  cd ../
  RM_DIR="$(pwd)"
  cd ..
  echo "Removing $RM_DIR"
  rm -rf "$RM_DIR"
  cd "$HOME"
done
cd data-works/
git add .
git commit -m "Auto commit"
git push