<?php

/**
 * @package     Joomla.Administrator
 * @subpackage  mod_tasklist
 *
 * @copyright   (C) 2022 Brian Teeman. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

use Joomla\CMS\Language\Text;

$app->getDocument()->getWebAssetManager()
    ->registerAndUseScript('mod_tasklist.admin', 'mod_tasklist/admin-tasklist.js', [], ['type' => 'module', 'defer' => true])
    ->registerAndUseStyle('mod_tasklist.admin', 'mod_tasklist/admin-tasklist.css');
?>
<!--language strings for javascript -->
<?php Text::script('MOD_TASKLIST_DELETE'); ?>
<?php Text::script('MOD_TASKLIST_TODO'); ?>


<details class="details">
    <summary>
        <div class="header-item-content">
            <div class="header-item-icon">
                <div class="w-auto">
                    <span class="icon-list-2 icon-fw" aria-hidden="true"></span>
                </div>
            </div>
            <div class="header-item-text">
                <?php echo Text::_('MOD_TASKLIST_TOOLBAR'); ?>
            </div>
        </div>
        <div class="details-popup-overlay"></div>
    </summary>
    <div class="details-popup">
        <div class="joomla-tasks">
            <div class="card add">
                    <label for="addtask" class="sr-only"><?php echo Text::_('MOD_TASKLIST_CREATE'); ?></label>
                    <input
                        type="text"
                        class="txt-input"
                        placeholder="<?php echo Text::_('MOD_TASKLIST_PLACEHOLDER'); ?>"
                        spellcheck="false"
                        autocomplete="off"
                        id="addtask"
                    />
                <button class="btn btn-primary" id="add-btn"><?php echo Text::_('MOD_TASKLIST_ADD'); ?></button>
            </div>
            <ul class="tasks"></ul>
            <div class="card stat">
                <div class="corner">
                    <span id="items-left">0</span>
                </div>
                <div class="filter">
                    <button id="all" class="on btn btn-outline-primary"><?php echo Text::_('MOD_TASKLIST_ALL'); ?></button>
                    <button id="active" class="btn btn-outline-primary"><?php echo Text::_('MOD_TASKLIST_ACTIVE'); ?></button>
                    <button id="completed" class="btn btn-outline-primary"><?php echo Text::_('MOD_TASKLIST_COMPLETED'); ?></button>
                </div>
                <div class="corner">
                    <button id="clear-completed" class="btn btn-outline-danger"><?php echo Text::_('MOD_TASKLIST_CLEAR'); ?></button>
                </div>
            </div>
        </div>
    </div>
</details>
