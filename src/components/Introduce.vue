<template lang="html">
  <div id="introduction" class="l-section l-split">

            <!-- 소개말 -->
            <section role="region" id="myself" class="l-section">
                <div class="l-section-inner is-init is-animated" data-animation="zoom-in-right">
                    <h2 class="section-heading">
                        <span class="secondary" style="  background-color: #1895c5 !important;">Intro</span>
                        <span class="primary" style="  background-color: #1895c5 !important;">About myself</span>
                    </h2>

                    <div class="section-content">
                      <p v-for="line in (intro.myintro || '').split('.')" >{{ line }}</p>

                    </div>
                </div>
            </section>

            <!-- 기술 -->
            <section role="region" id="skills" class="l-section">
                <div class="l-section-inner is-init is-animated" data-animation="zoom-in-left">
                    <h2 class="section-heading" >
                        <span class="secondary" style="  background-color: #1ca8dd !important;">Skills</span>
                        <span class="primary" style="  background-color: #1ca8dd !important;">What I can do</span>
                    </h2>

                    <div class="section-content">
                        <figure>
                            <figcaption class="list-caption">HTML</figcaption>
                            <ul class="skill-list checked-list">
                              <template v-for="html in intro.myskills.html">
                                <li>{{html}}</li>
                              </template>
                            </ul>
                        </figure>

                        <figure>
                            <figcaption class="list-caption">CSS</figcaption>
                            <ul class="skill-list checked-list">
                              <template v-for="css in intro.myskills.css">
                                <li>{{css}}</li>
                              </template>
                            </ul>
                        </figure>

                        <figure>
                            <figcaption class="list-caption">JavaScript</figcaption>
                            <ul class="skill-list checked-list">
                              <template v-for="js in intro.myskills.javascript">
                                <li>{{js}}</li>
                              </template>
                            </ul>
                        </figure>
                    </div>
                </div>
            </section>

        </div>
</template>

<script>
import FirebaseService from '@/services/FirebaseServices'
export default {
  props : {
    intro :{type:null}
  },
  mounted() {

  }
}
</script>

<style lang="css" scoped>

/* title*/
#myself .section-heading .primary {
    padding-bottom: .25em;
    position: relative;
}
.section-heading .primary {
    display: block;
    font-size: 64px;
    padding-bottom: .25em;
    position: relative;
}

#skills .primary {
    padding-bottom: .25em;
    position: relative;
}

#skills .section-heading {
    text-align: left;
}


#myself .section-heading {
    text-align: right;
}
.section-heading {
    text-align: center;
}
h1, h2, h3, h4, h5, h6 {
    margin: 0;
    line-height: 1.2;
    font-family: "Quicksand",sans-serif;
    font-weight: normal;
}
user agent stylesheet
h2 {
    font-size: 1.5em;
    font-weight: bold;
}
#myself {
    background: #1895c5;
    text-align: right;
}
#myself, #skills {
    color: white;
    width: 50%;
}
.l-section.l-split {
    display: table;
    width: 100%;
    padding: 0;
    border-spacing: 0;
    table-layout: fixed;
}

/* Intro */

#myself {
    background: #1895c5;
    text-align: right;
}

@media screen and (max-width: 1259px)
#myself, #myself .section-heading {
    text-align: center;
}

@media screen and (max-width: 1259px)
#myself {
    min-height: auto;
}

#myself {
    background: #1895c5;
    text-align: right;
}

#myself, #skills {
    color: white;
    width: 50%;
}

@media screen and (max-width: 1259px)
.l-section.l-split>.l-section {
    display: block;
    width: 100% !important;
}

.l-section.l-split>.l-section {
    display: table-cell;
}

@media screen and (max-width: 1499px)
.l-section {
    padding: 100px 5vw;
}

.l-section {
    background: white;
}

.l-section {
    min-height: 100vh;
    padding: 15vh 100px;
    position: relative;
    box-sizing: border-box;
}

.l-section.l-split {
    display: table;
    width: 100%;
    padding: 0;
    border-spacing: 0;
    table-layout: fixed;
}

body {
    color: black;
    line-height: 2;
    font-family: "Roboto",system-ui,-apple-system,BlinkMacSystemFont,"Malgun Gothic",Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
    font-weight: 400;
    -webkit-text-size-adjust: none;
    -moz-text-size-adjust: none;
    -ms-text-size-adjust: none;
    -o-text-size-adjust: none;
    text-size-adjust: none;
}

html, body {
    font-size: 15px;
}

/* skills*/

.primary {
    background-color: #1976d2 !important;
    border-color: #1976d2 !important;
}
@media screen and (max-width: 1259px)
#skills {
    min-height: auto;
}

#skills {
    background: #1ca8dd;
    text-align: left;
}
#myself, #skills {
    color: white;
    width: 50%;
}
@media screen and (max-width: 1259px)
.l-section.l-split>.l-section {
    display: block;
    width: 100% !important;
}
.l-section.l-split>.l-section {
    display: table-cell;
}
@media screen and (max-width: 1499px)
.l-section {
    padding: 100px 5vw;
}
.l-section {
    background: white;
}
.l-section {
    min-height: 100vh;
    padding: 15vh 100px;
    position: relative;
    box-sizing: border-box;
}
user agent stylesheet
section {
    display: block;
}
.l-section.l-split {
    display: table;
    width: 100%;
    padding: 0;
    border-spacing: 0;
    table-layout: fixed;
}
body {
    color: black;
    line-height: 2;
    font-family: "Roboto",system-ui,-apple-system,BlinkMacSystemFont,"Malgun Gothic",Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
    font-weight: 400;
    -webkit-text-size-adjust: none;
    -moz-text-size-adjust: none;
    -ms-text-size-adjust: none;
    -o-text-size-adjust: none;
    text-size-adjust: none;
}
html, body {
    font-size: 15px;
}
</style>
