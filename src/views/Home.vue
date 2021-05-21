<template>
	<div class="container">
        <h1>Block Editor Demo</h1>
		<block-editor 
            class='my-block-editor'
            ref="blockEditor" 
            @Compiled="BlocksCompiled" 
            @Imported="BlocksImported" 
            :blocksExclude='["calc"]' 
            :values="welcomeData"
            :layout="{menu: true, propertyEditor: true, history: false, editor: true}"
        >
			<textEditorBlock name="Text Editor"/>
			<contactForm name="Contact Form" proto_id="_rnd_link_sb"/>
			<youtubeBlock name="YouTube video" proto_id="_rnd_ytvid"/>
			<dividerBlock name="Divider" proto_id="_rnd_div"/>
			<insideBlock name="Block with BlockEditor" proto_id="_rnd_bwb"/>
			<!-- <templateError>
				Упс! Блок не принадлежит этому элементу!
			</templateError> -->
			<!-- leftBottomPanel -->
            <!-- plusIcon -->
            <!-- rightBottomPanel -->
		</block-editor>

        <button class="compile" @click="compile">Compile to JSON</button>

        <!-- Wow https://getwaves.io/ -->
        <!-- <svg class="darkWave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#2e2e2e" fill-opacity="1" d="M0,224L48,234.7C96,245,192,267,288,250.7C384,235,480,181,576,170.7C672,160,768,192,864,202.7C960,213,1056,203,1152,181.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg> -->
        <div class="darkScreen">
            <h2>How does it works?</h2>
            <div class="step">
                <div class="top">
                    <span class="number">1</span>
                    <div class="title">Create a block</div>
                </div>
                <div class="middle">
                    Write your own block in the <b>.vue</b> file.<br>
                    The block has its own syntax:
                    <ul>
                        <li>The root element must be a  <b>block-content</b> element;</li>
                        <li>You can specify the properties of the block settings in the  <b>propertyPopup</b> element with an title;</li>
                        <li>Don't modify <b>setData</b>, <b>getData</b> and <b>slotMounted</b> methods submitted by template.</li>
                    </ul>
                    Just look at the example below, it's template:
                </div>
                <div class="code">
                    <VueEmbedGist gist-id="0646e77ecb334a26699cd3e29dec0b6e"/>
                </div>
            </div>
            
            <div class="step">
                <div class="top">
                    <span class="number">2</span>
                    <div class="title">Import BlockEditor</div>
                </div>
                <div class="middle">
                    Just import <b>BlockEditor and styles</b> to any .vue file in your project.<br>
                    Just look at the example below:
                </div>
                <div class="code">
                    <VueEmbedGist gist-id="2de3b1366c1436f4caa208b843640b25"/>
                </div>
            </div>
            
            <div class="step">
                <div class="top">
                    <span class="number">3</span>
                    <div class="title">Pass your Block to BlockEditor</div>
                </div>
                <div class="middle">
                    Import it and pass as a <b>slot</b> with name.<br>
                    Just look at the example below:
                </div>
                <div class="code">
                    <VueEmbedGist gist-id="367d7107a3619ae857110995aca63ecc"/>
                </div>
            </div>

            <a class='to_gh' href="https://github.com/powerdot/vue-block-editor" target="_blank" rel="noopener noreferrer">Go to GitHub page for Documentation.</a>
        </div>

        <svg class='lightWave' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#f3f4f5" fill-opacity="1" d="M0,0L48,21.3C96,43,192,85,288,101.3C384,117,480,107,576,90.7C672,75,768,53,864,53.3C960,53,1056,75,1152,74.7C1248,75,1344,53,1392,42.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
        <div class="footer">
            <a target="_blank" href="https://github.com/powerdot">@powerdot's GitHub</a> | 
            <a target="_blank" href="https://getwaves.io/">GetWaves</a>
        </div>
    </div>
</template>

<script>
import BlockEditor from '../components/BlockEditor/main.vue';
import VueEmbedGist from "vue-embed-gist";
let welcomeData = require("../welcomeData");

export default {
	name: 'Home',
    title: 'BlockEditor Demo',
	components: {
		BlockEditor,
        VueEmbedGist,
		textEditorBlock: ()=> import("../components/BlockEditor/blocks/textEditorBlock"),
		contactForm: ()=> import("../components/BlockEditor/blocks/contactForm"),
		insideBlock: ()=> import("../components/BlockEditor/blocks/insideBlock"),
		youtubeBlock: ()=> import("../components/BlockEditor/blocks/youtubeBlock"),
		dividerBlock: ()=> import("../components/BlockEditor/blocks/dividerBlock")
	},
	data: ()=>{
		return {
            welcomeData: welcomeData
        }
	},
	methods: {
		BlocksCompiled(data){
			console.log("BlocksCompiled", data);
		},
		BlocksImported(){
			console.log("Blocks Imported!")
		},
        compile(){
            this.$refs.blockEditor.Compile();
        }
	},
    mounted(){}
}
</script>

<style lang="scss" scoped>
h1{
    text-align: center;
    height: 45px;
    cursor: default;
}
h2{
    text-align: center;
    cursor: default;
}
.my-block-editor{
    border-top: 1px solid #eee;
    box-shadow: 0 -10px 20px rgba(0,0,0,0.05);
    min-height: 600px;
}

.compile{
    position: relative;
    z-index: 2;
    top: -131px;
    left: 40px;
    padding: 10px 20px;
    border-radius: 6px;
    border: none;
    box-shadow: 0 5px 10px rgba(0,0,0,0.2);
    border: 1px solid black;
    background: white;
    cursor: pointer;
    &:hover{
        border-color: #3f51b5;
    }
    &:active{
        color: #3f51b5;
    }
}

.darkWave{
    margin-top: -250px;
    display: block;
}
.darkScreen{
    background: rgb(46, 46, 46);
    padding-top: 0;
    color: #dadada;
    min-height: 50px;
    padding-top: 150px;
    margin-top: -150px;
    position: relative;
    z-index: 1;
    h2{
        margin-top: 0;
        color: white;
    }
    padding-bottom: 150px;
}

.step{
    width: 100%;
    max-width: 1020px;
    margin: 0 auto;
    width: 100%;
    max-width: 1020px;
    margin: 0 auto;
    border-left: 1px solid #ffffff26;
    padding-left: 30px;
    margin-top: 50px;

    &:hover{
        border-left: 1px solid #ffffff3b;
    }

    .top{
        .number{
            height: 32px;
            width: 32px;
            border-radius: 64px;
            border: 2px solid white;
            display: inline-block;
            text-align: center;
            overflow: hidden;
            line-height: 33px;
            font-size: 17px;
            font-weight: bold;
            cursor: default;
        }
        .title{
            display: inline-block;
            height: 32px;
            overflow: hidden;
            font-size: 18pt;
            margin-left: 10px;
            color: white;
            cursor: default;
        }
    }
    .middle{
        margin-top: 10px;
        ul{
            padding-left: 20px;
            margin: 5px 0;
        }
        b{
            color: white;
        }
    }
    .code{
        width: calc(100% - 60px);
    }
}

.to_gh{
    color: white;
    text-decoration: none;
    cursor: pointer;
    padding: 10px 20px;
    border-radius: 6px;
    border: 1px solid;
    margin: 80px auto;
    display: block;
    width: fit-content;
    &:hover{
        color: black;
        background: white;
        border-color: white;
    }
}


.lightWave{
    margin-top: -150px;
    display: block;
    position: relative;
    z-index: 1;
}
.footer{
    text-align: center;
    background: #f3f4f5;
    padding: 24px 0;
    padding-bottom: calc(100vw / 5);
    position: relative;
    z-index: 1;
    a{
        color: black;
    }
}
</style>

<style lang="scss">
    .container .editor .item{
        z-index: 2 !important;
    }
</style>