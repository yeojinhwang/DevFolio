<template lang="html">

      <v-flex xs12>
      <form name="form1" method="post" action="/module/board/board_evn.php" enctype="multipart/form-data" class="reportForm askForm  commonForm">
  				<input type="hidden" name="evnMode" value="write">

  		<input type="hidden" name="boardid" value="after">
  		<input type="hidden" name="returnURL" value="/customerCenter/ask.php?boardid=after&amp;mode=list&amp;category=">
  		<input type="hidden" name="idx" value="">
  		<input type="hidden" name="category" value="">
  				<input type="hidden" name="usehtml" value="Y">
  				<input type="hidden" name="chkAgree" id="chkAgree" value="">
  		<input type="hidden" name="chkAgree2" id="chkAgree2" value="">

  			<!-- 개인정보 수집 -->
  			<p class="tit">개인정보 수집 및 이용에 대한 동의</p>
  			<div class="scrollBox">

  				<p>
  					1. 개인정보의 수집 및 이용목적<br>
                      - 실명확인 및 본인여부 확인, 포트폴리오 제공,채용정보 안내 및 채용선별 자료 등으로 이용
                   </p>
                   <br>
                    <p>2. 개인정보 수집 항목<br>
                      - 필수항목 <br>
                          개인식별정보 (성명, 생년월일, 비밀번호, 사진 등)<br>
                          기초정보 (희망연봉, 전화번호, 종교, 휴대전화번호, E-mail, 자택주소 등)<br>
                          신상정보 (병역사항, 병역기간, 군별, 계급, 보훈대상여부, 장애대상여부, 미필사유 등)<br>
                          학력정보 (재학기간, 학교, 전공, 졸업여부, 소재지, 성적 등)<br>
                          포트폴리오<br>
                       - 선택항목<br>
                          Git 정보 (Git 주소, 코드 등)<br>
                          홈페이지 정보 (홈페이지 링크 정보, 홈페이지 트래픽 정보)<br>

                    </p>
                    <br>

                    <p>
                    3. 개인정보의 보유 및 이용기간<br>
                   	회사는 개인정보 수집 및 이용목적이 달성된 경우, 개인정보의 수집 및 이용에 대한 동의를 철회하는 경우에는 해당 정보를 지체 없이 파기 합니다.
                    </p>
                    <br>
                    <p>※ 귀하는 상기의 개인정보 수집 및 이용 동의를 거부할 수 있습니다.</p>


  			</div>
  			<p>
  				<input type="checkbox" id="agree1">
  				<label for="agree1">개인정보 수집 및 이용에 동의합니다. </label>
  			</p>
  			<!-- //개인정보 수집 -->


  			<!-- 입력폼 -->
  			<fieldset class="reportCont">
  				<legend></legend>
  				<p class="tit">&nbsp;</p>
  				<table class="boardTable">
  					<caption></caption>
  					<colgroup>
  						<col style="width:160px">
  						<col style="">
  					</colgroup>
  					<tbody>
  						<tr>
  							<th scope="row">포트폴리오타입</th>
  							<td>
  								<select name="subject" id="subject">
  									<option value="">선택하세요!</option>
  									<option value="제품문의">타입A</option>
  									<option value="IR문의">타입B</option>
  									<option value="불만사항">타입C</option>
  									<option value="기타">타입D</option>
  								</select>
  								<span style="float:left;">(플랫폼을 먼저 선택하시고 내용을 작성해 주세요)</span>
  							</td>
  						</tr>
  						<tr>
  							<th scope="row">제목</th>
  							<td>
  								<input type="text" name="name" id="name" value="">
  							</td>
  						</tr>
  						<tr>
  							<th scope="row">Viewport</th>
  							<td>
  								<input type="text" name="etc_2" id="etc_2" value="">
  							</td>
  						</tr>
  						<tr>
  							<th scope="row">IE support</th>
  							<td>
  								<input type="text" name="email" id="email" value="">
  							</td>
  						</tr>

                        <tr>
  							<th scope="row">HTML Skills</th>
  							<td>
  								<input type="text" name="email" id="html" value="" style="width:80%; float:left; margin-right:20px;" placeholder="html Skill을 적고 확인을 누르세요!"><v-btn color="success"  style="width:15%; float:left" v-on:click="htmlClick" >확인</v-btn>
  							</td>
  						</tr>
              <div id ="input_html">
                <tr>
                    <td style="padding-left: 10rem; padding-bottom: 0; padding-top: 0; border-top:none;"></td>
                    <td style="border-top:none;">
                    <template v-for="(html,index) in htmlSkill" >
                        <template v-if="html !==null">
                        <v-chip close color="teal" text-color="white" v-model="htmlSkill[index]" style="">
                            <v-avatar>
                                <v-icon>check_circle</v-icon>
                            </v-avatar>
                            {{ html }}
                        </v-chip>
                      </template>
                    </template>
                  </td>
                </tr>
              </div>

              <tr>
                <th scope="row">JavaScript Skills</th>
                <td>
                  <input type="text" name="email" id="javascript" value="" style="width:80%; float:left; margin-right:20px;" placeholder="JavaScript Skill을 적고 확인을 누르세요!"><v-btn color="success"  style="width:15%; float:left" v-on:click="jsClick" >확인</v-btn>
                </td>
              </tr>
              <div id ="input_js">
                <tr>
                    <td style="padding-left: 10rem; padding-bottom: 0; padding-top: 0; border-top:none;"></td>
                    <td style="border-top:none;">
                    <template v-for="(js,index) in jsSkill" >
                        <template v-if="js !==null">
                        <v-chip close color="teal" text-color="white" v-model="jsSkill[index]" style="">
                            <v-avatar>
                                <v-icon>check_circle</v-icon>
                            </v-avatar>
                            {{ js }}
                        </v-chip>
                      </template>
                    </template>
                  </td>
                </tr>
              </div>
              <tr style="border-bottom:none;">
                <th scope="row" style="border-bottom:none;">CSS Skills</th>
                <td style="border-bottom:none;">

                  <input type="text" name="email" id="css" value="" style="width:80%; float:left; margin-right:20px;" placeholder="CSS Skill을 적고 확인을 누르세요!"><v-btn color="success"  style="width:15%; float:left" v-on:click="cssClick" >확인</v-btn>

                </td>
              </tr>
              <div id ="input_css">
                <tr>
                    <td style="padding-left: 10rem; padding-bottom: 0; padding-top: 0; border-top:none;"></td>
                    <td style="border-top:none;">
                    <template v-for="(css,index) in cssSkill" >
                        <template v-if="css !==null">
                        <v-chip close color="teal" text-color="white" v-model="cssSkill[index]" style="">
                            <v-avatar>
                                <v-icon>check_circle</v-icon>
                            </v-avatar>
                            {{ css }}
                        </v-chip>
                      </template>
                    </template>
                  </td>
                </tr>
              </div>
              <tr>
                <th scope="row">프로젝트 설명</th>
                <td>
                  <input type="text" name="email" id="project" value="">
                </td>
              </tr>
              <tr>
                <th scope="row">Demo 링크</th>
                <td>
                  <input type="text" name="email" id="demo" value="">
                </td>
              </tr>
              <tr>
                <th scope="row">Repo 링크</th>
                <td>
                  <input type="text" name="email" id="repo" value="">
                </td>
              </tr>

              <tr>
                <th scope="row">카테고리</th>
                <td>
                  <input type="text" name="email" id="repo" value="">
                </td>
              </tr>
  						<tr>
  							<th scope="row">자기소개 내용</th>
  							<td>
  								<textarea name="contents" cols="30" rows="10" style="height: 200px;" title="내용" placeholder="문장이 끝날때 마침표를 반드시 찍어주세요"></textarea>
  								<!-- span>( 0/2000 자 )</span-->
  							</td>
  						</tr>

              <tr>
  							<th scope="row">소스코드</th>
  							<td>
  								<select name="subject" id="source" style="width:15%; margin-right:20px; float:left;">
  									<option value="">선택하세요!</option>
  									<option value="HTML">HTML</option>
  									<option value="CSS">CSS</option>
  									<option value="JavaScript">JavaScript</option>

  								</select>
  								<input type="text" name="etc_2" id="source_1" value="" style="width:15%; margin-right:20px; float:left;" placeholder="파일명">
                  <input type="text" name="etc_2" id="source_2" value="" style="width:15%; float:left; margin-right:20px;" placeholder="git주소">
                  <input type="text" name="etc_2" id="source_3" value="" style="width:30%; float:left; margin-right:20px;" placeholder="파일설명">
                  <v-btn color="success"  style="width:15%; float:left" v-on:click="sourceClick" >확인</v-btn>
  							</td>
  						</tr>
              <div id ="input_source">
                <tr>
                    <td style="padding-left: 10rem; padding-bottom: 0; padding-top: 0; border-top:none;"></td>
                    <td style="border-top:none;">
                    <template v-for="(html,index) in category_html" >
                        <template v-if="html !==null">
                        <v-chip close color="teal" text-color="white" v-model="category_html[index]" style="">
                            <v-avatar>
                                <v-icon>check_circle</v-icon>
                            </v-avatar>
                          HTML 파일명: {{ html.file }}, URL : {{html.url}}, 설명 : {{html.keyword}}

                        </v-chip>
                      </template>
                    </template>
                    <template v-for="(css,index) in category_css" >
                        <template v-if="css !==null">
                        <v-chip close color="teal" text-color="white" v-model="category_css[index]" style="">
                            <v-avatar>
                                <v-icon>check_circle</v-icon>
                            </v-avatar>
                              CSS  파일명: {{ html.file }}, URL : {{html.url}}, 설명 : {{html.keyword}}
                        </v-chip>
                      </template>
                    </template>
                    <template v-for="(js,index) in category_js" >
                        <template v-if="css !==null">
                        <v-chip close color="teal" text-color="white" v-model="category_js[index]" style="">
                            <v-avatar>
                                <v-icon>check_circle</v-icon>
                            </v-avatar>
                              JavaScript  파일명: {{ html.file }}, URL : {{html.url}}, 설명 : {{html.keyword}}
                        </v-chip>
                      </template>
                    </template>
                  </td>
                </tr>
              </div>
  						<tr>
  							<th>포트폴리오이미지</th>
  							<td>
  								<div class="fileWrap">
  									<div class="filebox bs3-primary preview-image">
  										<label for="input_file">파일찾기</label>
  										<input class="upload-name" v-model="fileName" placeholder="선택된 파일 없음">
  										<input type="file" name="upfiles[]" id="input_file" class="upload-hidden" @change="processFile($event)">
  									</div>
  								</div>
  								<span></span>
  							</td>
  						</tr>
  					</tbody>
  				</table>
  			</fieldset>
  			<!-- //입력폼 -->
  			<div class="btnWrap text-center">
  				<a class="greenBtn" href="/portfolio">확인</a>
  				<a href="/">취소</a>
  			</div>
  	</form>
</v-flex>


</template>

<script>
export default {
  name : 'WritePort',
  data(){
    return {
        file : null,
        fileName :'이미지만 첨부하세요.',
        htmlSkill: [],
        jsSkill: [],
        cssSkill: [],
        category_css:[],
        category_html:[],
        category_js:[]
    }
  },
  methods: {
    processFile(event) {
        this.file = event.target.files[0];
        this.fileName =  event.target.files[0].name;
    },
    htmlClick(){
        let temp = $('#html').val();
        this.htmlSkill.push(temp);
        $('#html').val("");
        // $('#input_html:last').append("<tr><th scope='row'>myskill</th><td>" + temp + '</td></tr>');

    },
    jsClick(){
        let temp = $('#javascript').val();
        this.jsSkill.push(temp)
        $('#javascript').val("");
        // $('#input_js:last').append("<tr><th scope='row'>myskill</th><td>" + temp + '</td></tr>');
    },
    cssClick(){
        let temp = $('#css').val();
        this.cssSkill.push(temp)
        $('#css').val("");
        // $('#input_css:last').append("<tr><th scope='row'>myskill</th><td>" + temp + '</td></tr>');
    },
    sourceClick(){
        let temp = $('#source option:selected').val();
        let filename = $("#source_1").val();
        let gitsource = $("#source_2").val();
        let keyword = $("#source_3").val();
        if(temp=="CSS"){

            let aJson = new Object();
            aJson.file=filename;
            aJson.keyword=keyword;
            aJson.url=gitsource;
            this.category_css.push(aJson);

        }
        else if(temp=="HTML"){
          let aJson = new Object();
          aJson.file=filename;
          aJson.keyword=keyword;
          aJson.url=gitsource;
          this.category_html.push(aJson);
        }
        else if(temp=="JavaScript"){
          let aJson = new Object();
          aJson.file=filename;
          aJson.keyword=keyword;
          aJson.url=gitsource;
          this.category_js.push(aJson);
        }
        $("#source").val("").prop("selected", true);
        $("#source_1").val("");
        $("#source_2").val("");
        $("#source_3").val("");

    }

    }
}
</script>

<style lang="css" scoped>
body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, form, fieldset, p, button, input, textarea {
    margin: 0;
    padding: 0;
    font-size: inherit;
    font-family: 'notokr';
}
* {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

user agent stylesheet
form {
    display: block;
    margin-top: 0em;
}

#subject {
  float: left;
}
body {
    font-family: "notokr";
    min-width: 1100px;
    -webkit-font-smoothing: subpixel-antialiased;
}
#input_file {}
body {
    width: 100%;
    height: 100%;
    position: relative;
    min-width: 320px;
    position: relative;
    word-break: keep-all;
}

fieldset {
    border: none;
    margin: 0;
    padding: 0;
}

* {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

fieldset {
    display: block;
    margin-inline-start: 2px;
    margin-inline-end: 2px;
    padding-block-start: 0.35em;
    padding-inline-start: 0.75em;
    padding-inline-end: 0.75em;
    padding-block-end: 0.625em;
    min-inline-size: min-content;
    border-width: 2px;
    border-style: groove;
    border-color: threedface;
    border-image: initial;
}

.boardTable tbody th {
    background: #f8f8f8;
    font-weight: 500;
    border-top: 1px solid #ddd;
}
.boardTable th {
    height: 49px;
    font-size: 15px;
    font-weight: 500;
}
table th, table td {
    padding: 0;
    border: 0;
    border-spacing: 0;
}
* {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
.filebox input[type="file"] {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0,0,0,0);
    border: 0;
}
th {
    display: table-cell;
    vertical-align: inherit;
    font-weight: bold;
    text-align: -internal-center;
}
.boardTable {
    border-top: 2px solid #333;
    width: 100%;
    font-size: 15px;
    color: #333;
    table-layout: fixed;
    border-bottom: 1px solid #ddd;
    margin-bottom: 55px;
}
table {
    border: 0;
    padding: 0;
    border-spacing: 0;
}

table {
    border-collapse: separate;
    border-spacing: 2px;
}


.askForm .tit {
    margin-top: 0;
}
.reportForm .tit {
    margin-top: 45px;
    display: inline-block;
}
.commonForm .tit {
    font-size: 17px;
    color: #333;
    font-weight: 600;
    margin-bottom: 30px;
}

.commonForm .scrollBox {
    font-size: 14px;
    color: #666;
    border: 1px solid #ddd;
    height: 226px;
    padding: 30px;
    overflow-y: auto;
    margin-bottom: 20px;
    word-break: break-all;
}



div {
    display: block;
}


label {
    margin-bottom: 0;
}

label {
    cursor: default;
}

.reportForm table td select {
    margin-right: 15px;
}
.boardTable td select, .boardTable td input[type="text"] {
    width: 318px;
    height: 40px;
    border: 1px solid #d1d1d1;
}
select {
    background: #fff;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding: 0 28px 0 10px;
    background: url(/img/common/pageNavArrow.png) no-repeat 90% 50%;
}

select:not(:-internal-list-box) {
    overflow: visible !important;
}

select {
    -webkit-writing-mode: horizontal-tb !important;
    text-rendering: auto;
    color: black;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    -webkit-appearance: menulist;
    box-sizing: border-box;
    align-items: center;
    white-space: pre;
    -webkit-rtl-ordering: logical;
    background-color: white;
    cursor: default;
    margin: 0em;
    font: 400 13.3333px Arial;
    border-radius: 0px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(169, 169, 169);
    border-image: initial;
}

.boardTable td {
    padding: 11px 0;
    color: #555;
    border-top: 1px solid  #ddd;
}

.boardTable {
    border-top: 1px solid  #ddd;
    width: 100%;
    font-size: 15px;
    color: #333;
    table-layout: fixed;
    border-bottom: 1px solid #ddd;
    margin-bottom: 55px;
}
table {
    border: 0;
    padding: 0;
    border-spacing: 0;
}

table {
    border-collapse: separate;
    border-spacing: 2px;
}

.reportForm .reportCont textarea {
    width: 100%;
    height: 180px;
    padding: 5px 10px;
    border: 1px solid #d1d1d1;
}
textarea {
    resize: none;
}

body{
  background-color: white;
}


.v-content__wrap {
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    max-width: 100%;
    position: relative;
    background-color: white;
}

.container {
  text-align: center;
  background-color: white;
}

form {
  margin: 0 auto;
}

textarea {
    -webkit-writing-mode: horizontal-tb !important;
    text-rendering: auto;
    color: initial;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    -webkit-appearance: textarea;
    background-color: white;
    -webkit-rtl-ordering: logical;
    flex-direction: column;
    resize: auto;
    cursor: text;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    margin: 0em;
    font: 400 13.3333px Arial;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(169, 169, 169);
    border-image: initial;
    padding: 2px;
}
.boardTable td {
    padding: 11px 0;
    color: #555;
    border-top: 1px solid #ddd;
}
table th, table td {
    padding: 0;
    border: 0;
    border-spacing: 0;
}



.reportForm table td select {
    margin-right: 15px;
}
.boardTable td select, .boardTable td input[type="text"] {
    width: 318px;
    height: 40px;
    border: 1px solid #d1d1d1;
}
select {
    background: #fff;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding: 0 28px 0 10px;
    background: url(/img/common/pageNavArrow.png) no-repeat 90% 50%;
}
* {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

select:not(:-internal-list-box) {
    overflow: visible !important;
}

select {
    -webkit-writing-mode: horizontal-tb !important;
    text-rendering: auto;
    color: black;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    -webkit-appearance: menulist;
    box-sizing: border-box;
    align-items: center;
    white-space: pre;
    -webkit-rtl-ordering: logical;
    background-color: white;
    cursor: default;
    margin: 0em;
    font: 400 13.3333px Arial;
    border-radius: 0px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(169, 169, 169);
    border-image: initial;
}

fieldset {
    display: block;
    margin-inline-start: 2px;
    margin-inline-end: 2px;
    padding-block-start: 0.35em;
    padding-inline-start: 0.75em;
    padding-inline-end: 0.75em;
    padding-block-end: 0.625em;
    min-inline-size: min-content;
    border-width: 2px;
    border-style: groove;
    border-color: threedface;
    border-image: initial;
}

fieldset {
    border: none;
    margin: 0;
    padding: 0;
}

.reportForm .reportCont input[type="text"] {
    width: 100%;
}
.boardTable td select, .boardTable td input[type="text"] {
    width: 318px;
    height: 40px;
    border: 1px solid #d1d1d1;
}
input[type="text"], slelct {
    padding: 0 10px;
    font-size: 15px;
}

input {
    -webkit-writing-mode: horizontal-tb !important;
    text-rendering: auto;
    color: initial;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    -webkit-appearance: textfield;
    background-color: white;
    -webkit-rtl-ordering: logical;
    cursor: text;
    margin: 0em;
    font: 400 13.3333px Arial;
    padding: 1px 0px;
    border-width: 2px;
    border-style: inset;
    border-color: initial;
    border-image: initial;
}

.filebox .upload-name {
    font-size: 15px;
    width: 700px;
    display: inline-block;
    line-height: 40px;
    height: 40px;
    vertical-align: middle;
    padding-left: 20px;
    background-color: #fff;
    -webkit-appearance: none;
    border: none;
    -moz-appearance: none;
    appearance: none;
}

.reportForm table td {
    padding: 10px 20px;
}
.boardTable td {
    padding: 11px 0;
    color: #555;
    border-top: 1px solid #ddd;
}


.filebox.bs3-primary label {
    font-size: 15px;
    color: #333;
    border: 1px solid #ddd;
    background: #f3f3f3;
    border-radius: 5px;
    line-height: 40px;
    height: 40px;
    width: 105px;
    font-weight: normal;
    text-align: center;
}
.filebox label {
    display: inline-block;
    color: #999;
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
    margin-bottom: 0;
}

input[type="checkbox" i] {
    background-color: initial;
    cursor: default;
    -webkit-appearance: checkbox;
    box-sizing: border-box;
    margin: 3px 3px 3px 4px;
    padding: initial;
    border: initial;
}

.filebox {
  float: left;
}

input {
    -webkit-writing-mode: horizontal-tb !important;
    text-rendering: auto;
    color: initial;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    -webkit-appearance: textfield;
    background-color: white;
    -webkit-rtl-ordering: logical;
    cursor: text;
    margin: 0em;
    font: 400 13.3333px Arial;
    padding: 1px 0px;
    border-width: 2px;
    border-style: inset;
    border-color: initial;
    border-image: initial;
}

.filebox .upload-name {
    font-size: 15px;
    width: 700px;
    display: inline-block;
    line-height: 40px;
    height: 40px;
    vertical-align: middle;
    padding-left: 20px;
    background-color: #fff;
    -webkit-appearance: none;
    border: none;
    -moz-appearance: none;
    appearance: none;
}

form .btnWrap a {
    font-size: 16px;
    font-weight: 500;
    display: inline-block;
    height: 50px;
    line-height: 50px;
    width: 135px;
    border: 1px solid #adadad;
    color: #333;
    font-size: 16px;
    margin-left: 9px;
}
a:-webkit-any-link {
    text-decoration: none;
}

form .btnWrap a.greenBtn {
    background: #257d2a;
    border: 1px solid #257d2a;
    color: #fff;
}
form .btnWrap a:first-child {
    margin-left: 0;
}
form .btnWrap a {
    font-size: 16px;
    font-weight: 500;
    display: inline-block;
    height: 50px;
    line-height: 50px;
    width: 135px;
    border: 1px solid #adadad;
    color: #333;
    font-size: 16px;
    margin-left: 9px;
}
a:-webkit-any-link {
    text-decoration: none;
}
.greenBtn {
    display: inline-block;
    background: #257d2a;
    color: #fff;
    font-size: 16px;
    height: 50px;
    line-height: 50px;
    min-width: 130px;
}

.reportForm table td span {
    font-size: 14px;
}



p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}
</style>
