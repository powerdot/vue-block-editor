import BlockEditor from "./main.vue";
import contactForm from "../BlockEditor/blocks/contactForm.vue";
import dividerBlock from "../BlockEditor/blocks/dividerBlock.vue";
import insideBlock from "../BlockEditor/blocks/insideBlock.vue";
import textEditorBlock from "../BlockEditor/blocks/textEditorBlock.vue";
import youtubeBlock from "../BlockEditor/blocks/youtubeBlock.vue";

export default {
    Editor: BlockEditor,
    defaultBlocks: {
        contactForm,
        dividerBlock,
        insideBlock,
        textEditorBlock,
        youtubeBlock
    }
};