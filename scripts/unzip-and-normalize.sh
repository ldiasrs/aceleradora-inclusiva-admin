CURRENT_CLASS_PATH='../aceleradora-inclusiva-showcase-web/public/pages/t05'
HOME="$(pwd)"

echo "Unziping files and removinf zip files on:"$CURRENT_CLASS_PATH
find $CURRENT_CLASS_PATH -name '*.zip' -exec sh -c 'unzip -d `dirname {}` {}' ';'
find $CURRENT_CLASS_PATH -name "*.zip" -exec rm -rf {} \;
echo "Looking dis folders on:"$CURRENT_CLASS_PATH
for line in $(find $CURRENT_CLASS_PATH -name dist); do 
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