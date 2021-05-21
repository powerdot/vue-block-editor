import BlockEditor from "./main.vue";
import linkBlock from "../BlockEditor/blocks/link.vue";
import calcBlock from "../BlockEditor/blocks/calc.vue";
// import textBlock from "../BlockEditor/blocks/text.vue";

export default {
    Editor: BlockEditor,
    defaultBlocks: {
        linkBlock,
        calcBlock,
        // textBlock
    }
};