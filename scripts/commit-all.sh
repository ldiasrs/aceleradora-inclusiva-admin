find ./data-works/ -name '*.zip' -exec sh -c 'unzip -d `dirname {}` {}' ';'
find ./data-works/ -name "*.zip" -exec rm -rf {} \;
cd data-works/
git add .
git commit -m "Auto commit"
git push