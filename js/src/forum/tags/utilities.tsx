import app from "flarum/forum/app";
import alertPreviewModal from "../components/alertPreviewModal";
import TagCollector, { StyleArgs } from "../helper/tagCollector";
import { prioritySerial } from "../utils/nodeUtil";
import { bbcode, merge, pair, prefix } from "../utils/styleUtil";
import CommentPost from "flarum/forum/components/CommentPost";
import ComposerPostPreview from "flarum/forum/components/ComposerPostPreview";
import { extend } from "flarum/common/extend";
import common from "../utils/commonReplace";
export default function addUtilitiesTags(tags: TagCollector, priority: () => number) {
    //Containers
    tags.group(priority(), "container",
        "fas fa-square",
        "xypp-more-bbcode.forum.container.title", (tags) => {
            const priority = prioritySerial(100, 100);
            //Table
            tags.add(priority(), "table",
                "fas fa-table",
                "xypp-more-bbcode.forum.container.table",
                prefix("\n| Column 1 | Column 2 | Column 3 | Column 4 |\n|---|---|---|---|\n| row 1 | row 2 | row 3 | row 4 |\n"));
            //Quote
            tags.add(priority(), "quote",
                "fas fa-quote-right",
                "xypp-more-bbcode.forum.container.quote",
                merge(prefix(">"), {
                    multiline: true,
                    surroundWithNewlines: true
                }));
            //Details
            tags.add(priority(), "details",
                "fas fa-info-circle",
                "xypp-more-bbcode.forum.container.details",
                merge(bbcode("[details=\"TITLE\"] CONTENT "), {
                    blockPrefix: '[/details]'
                }));
            //Tabs
            tags.add(priority(), "tabs",
                "fas fa-columns",
                "xypp-more-bbcode.forum.container.tabs",
                prefix(`
[tabs]
[tab=\"${common("column")}\"]${common("text")}[/tab]
[tab=\"${common("any")}\"]${common("text")}[/tab]
[/tabs]
`));
            //Alert
            tags.add(priority(), "alert",
                "fas fa-exclamation-triangle",
                "xypp-more-bbcode.forum.container.alert",
                makeAlert
            );

            tags.space(priority());

            //IFrame
            tags.add(priority(), "iframe",
                "fas fa-window-maximize",
                "xypp-more-bbcode.forum.container.iframe",
                pair('<iframe width="100%"  height="370px" title="Iframe Example" src="' + common("url") + '">', '</iframe>')
            )
        }
    );

    //Widgets
    tags.group(priority(), "widgets",
        "fas fa-bars",
        "xypp-more-bbcode.forum.widgets.title", (tags) => {
            const priority = prioritySerial(100, 100);
            //Alert
            tags.add(priority(), "alert",
                "fas fa-exclamation-triangle",
                "xypp-more-bbcode.forum.widgets.alert",
                makeAlert
            );
            //Progress
            tags.add(priority(), "progress",
                "fas fa-percentage",
                "xypp-more-bbcode.forum.widgets.progress",
                bbcode(`[pbar]${common("title")},51%,${common("simple")},black,red,pink,1,70,5,40`)
            );
        }
    );

    // RegTab
    extend(CommentPost.prototype, ["oncreate", "onupdate"], createTab);
    extend(ComposerPostPreview.prototype, "oncreate", function (this: ComposerPostPreview) {
        extend(this.attrs as any, "surround", createTab.bind(this));
    });
}
function makeAlert() {
    return new Promise<Partial<StyleArgs>>((resolve, reject) => {
        app.modal.show(alertPreviewModal, {
            onsubmit: resolve,
            oncancel: reject
        });
    })
}


/**
 * Tab Id Assigner
 * Copy from Litalino/flarum-more-bbcode
 */

let tabId = 0;
function createTab(this: CommentPost | ComposerPostPreview) {
    const containers = this.$(".tabs");
    containers.each((i, container) => {
        const $container = $(container);

        if ($container.find('input[type="radio"][name]').length) return;
        const $inputs = $container.find('> .tab > input[type="radio"]');

        if (!$inputs.length) return;

        const $items = $container.find(".tab");
        const num = tabId++;

        $inputs.attr("name", `tab-group-${num}`);

        if (!$inputs.is("[checked]"))
            $inputs[0].setAttribute("checked", "checked");

        $items.each((i, item) => {
            const $item = $(item);
            const id = `tab-${num}-${++i}`;

            $item.find('input[type="radio"]').attr("id", id);
            $item.find("label").attr("for", id);
        });
    });
};