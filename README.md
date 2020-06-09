## Google-Supercluster-Map
If you want to use Google Maps within your react project, [google-map-react](https://www.npmjs.com/package/google-map-react) is a great tool. However, if you have to display hundreds of thousands of points on a map, it becomes a problem. Rendering points into meaningful clusters with some usefully information for each cluster might fit for this purpose. [Supercluster](https://www.npmjs.com/package/use-supercluster) works pretty well with google-map-react for that purpose. With the help of the map/reduce features it provides, we can even adjust the style of the clusters and turn them into a heatmap.

### Project structure:
This project is a collection of the features I find while implementing supercluster in my react project. I first create 10 small examples which can be seen in the `examples` section. Those files are created in React Storybook. I took 4 of them and extend them to be a demo project. Feel free to clone this repo if you need to know how to use supercluster.

### Demo:
Demo can be seen [HERE](https://google-supercluster-map.herokuapp.com/).

### Sneak peek:
Some screenshots from this project:
![readme_01](/public/doc/readme_01.jpg?raw=true)
![readme_02](/public/doc/readme_02.jpg?raw=true)
![readme_03](/public/doc/readme_03.jpg?raw=true)
![readme_04](/public/doc/readme_04.jpg?raw=true)

### Getting Started
<ul>
    <li><b>npm run dev</b>: run development version</li>
    <li><b>npm run storybook</b>: only for developing components</li>
    <li><b>npm run build</b>: build the app for production</li>
    <li><b>npm run start</b>: run the exisitng build</li>
</ul>
