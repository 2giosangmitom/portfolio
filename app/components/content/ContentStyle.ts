import type { VNode } from "vue";

export default defineComponent({
  setup(_, { slots }) {
    const css = ref("");
    useHead({ style: [{ innerHTML: css }] });
    return () => {
      css.value = (slots.default?.() ?? []).map((v: VNode) => (typeof v.children === "string" ? v.children : "")).join("");
      return null;
    };
  },
});
