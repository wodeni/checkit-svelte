<script lang="ts">
    import katex from "katex";
    import { afterUpdate, beforeUpdate } from "svelte";
    import type { Exercise } from "../types";
    import { instructorEnabled } from "../stores/instructor";
    import { Nav, NavItem, NavLink, Row, Col } from "sveltestrap";
    import Penrose from "./Penrose.svelte";

    export let exercise: Exercise;
    export let hiddenAnswer: boolean = true;
    export let statementOnly: boolean = false;

    let inlineMathRe = /\\\((.*?)\\\)/gs;
    let displayMathRe = /\\\[(.*?)\\\]/gs;
    const parseMath = (html: string) => {
        return html
            .replace(inlineMathRe, (_, tex: string) =>
                katex.renderToString(tex, {
                    displayMode: false,
                    throwOnError: false,
                })
            )
            .replace(displayMathRe, (_, tex: string) =>
                katex.renderToString(tex, {
                    displayMode: true,
                    throwOnError: false,
                })
            );
    };

    let exerciseDiv: Element;
    const decorateAnswer = async () => {
        if (exerciseDiv) {
            for (let e of exerciseDiv.getElementsByClassName(
                "exercise-answer"
            )) {
                e.classList.add("alert");
                e.classList.add("alert-info");
                if (hiddenAnswer || statementOnly) {
                    e.classList.add("d-none");
                } else {
                    e.classList.remove("d-none");
                }
            }
        }
    };
    afterUpdate(decorateAnswer);

    const modes = ["display", "html", "tex", "pretext", "penrose"];
    const modeLabels = [
        "Display",
        "HTML source",
        "LaTeX source",
        "PreTeXt source",
        "Penrose diagram",
    ];
    let mode = "display";
    const changeMode = (m: string) => (e: Event) => {
        e.preventDefault();
        mode = m;
    };
</script>

<style>
    pre {
        border: 1px #ddd solid;
        background-color: #eee;
        padding: 4px;
        border-radius: 5px;
    }
    .navtabs {
        margin-bottom: 1em;
    }
</style>

{#if !statementOnly}
    {#if $instructorEnabled}
        <div class="navtabs">
            <Nav tabs>
                {#each modes as m, i}
                    <NavItem>
                        <NavLink
                            active={mode == m}
                            on:click={changeMode(m)}
                            href="#/">
                            {modeLabels[i]}
                        </NavLink>
                    </NavItem>
                {/each}
            </Nav>
        </div>
    {:else}
        <hr />
    {/if}
{/if}

<Row>
    <Col sm={{ size: 10, offset: 1 }}>
        {#if mode == 'display'}
            <div bind:this={exerciseDiv}>
                {@html parseMath(exercise.html)}
                <Penrose {exercise} />
            </div>
        {:else if mode == 'html'}
            <pre class="pre-scrollable"><code>{exercise.html}</code></pre>
        {:else if mode == 'tex'}
            <pre class="pre-scrollable"><code>{exercise.tex}</code></pre>
        {:else if mode == 'pretext'}
            <pre class="pre-scrollable"><code>{exercise.pretext}</code></pre>
        {:else if mode == 'penrose'}
            <Penrose {exercise} />
        {:else}Invalid mode.{/if}
    </Col>
</Row>
